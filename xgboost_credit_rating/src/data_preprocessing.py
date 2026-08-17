import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder


def fit_and_save_encoder(df, categorical_cols, encoder_path="models/encoder.pkl"):
    """Fits OneHotEncoder on categorical columns and saves the fitted model to disk."""
    os.makedirs(os.path.dirname(encoder_path), exist_ok=True)
    encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
    encoder.fit(df[categorical_cols])
    joblib.dump(encoder, encoder_path)
    return encoder


def load_and_preprocess_data(filepath="data/raw/cleaned_credit_risk_dataset.csv"):
    """Loads CSV, applies domain feature engineering and log transforms, encodes categoricals, and returns X, y, scale_pos_weight."""
    df = pd.read_csv(filepath)

    # 1. Clean Target Mapping
    if "Decision" in df.columns:
        decision_clean = df["Decision"].astype(str).str.strip().str.upper()
        target_map = {
            'APPROVE': 1, 'APPROVED': 1, '1': 1, '1.0': 1,
            'REJECT': 0, 'REJECTED': 0, '0': 0, '0.0': 0
        }
        df["Decision"] = decision_clean.map(target_map).fillna(0).astype(int)

    # 2. Identify core column variants
    income_col = next((c for c in ['Annual_Income', 'Annual Income', 'Income'] if c in df.columns), None)
    loan_col = next((c for c in ['Loan_Amount', 'Loan Amount'] if c in df.columns), None)
    dep_col = next((c for c in ['Number_of_Dependents', 'Dependents'] if c in df.columns), None)
    emi_col = next((c for c in ['Existing_Monthly_EMI', 'Monthly_EMI'] if c in df.columns), None)
    score_col = next((c for c in ['Credit_Score', 'Score'] if c in df.columns), None)
    dti_col = next((c for c in ['Debt_to_Income_Ratio', 'DTI'] if c in df.columns), None)

    # 3. Domain Interaction Features
    if loan_col and income_col:
        df["Debt_to_Income_Ratio"] = (df[loan_col] / (df[income_col] + 1)) * 100
        df["Loan_to_Income_Ratio"] = df[loan_col] / (df[income_col] + 1)

    if income_col and dep_col:
        df["Income_per_Dependent"] = df[income_col] / (df[dep_col] + 1)

    if emi_col and income_col:
        df["EMI_Burden"] = df[emi_col] / ((df[income_col] / 12) + 1)

    if score_col and dti_col:
        df["Risk_Score_Index"] = df[score_col] / (df[dti_col] + 1)

    if "Current_Debt" in df.columns and "Credit_Limit" in df.columns:
        df["Credit_Utilization"] = df["Current_Debt"] / (df["Credit_Limit"] + 1)

    # 4. Log Transformations for Highly Skewed Features
    skewed_cols = [c for c in [income_col, loan_col, 'Total_Outstanding_Debt'] if c and c in df.columns]
    for col in skewed_cols:
        df[f"{col}_Log"] = np.log1p(np.maximum(0, df[col]))

    # 5. Encoding Categorical Variables
    categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()
    if "Decision" in categorical_cols:
        categorical_cols.remove("Decision")

    if categorical_cols:
        encoder = fit_and_save_encoder(df, categorical_cols)
        encoded_array = encoder.transform(df[categorical_cols])
        encoded_df = pd.DataFrame(
            encoded_array,
            columns=encoder.get_feature_names_out(categorical_cols)
        )
        df = df.drop(columns=categorical_cols)
        df = pd.concat([df.reset_index(drop=True), encoded_df.reset_index(drop=True)], axis=1)

    # Save processed dataframe to data/processed folder
    processed_dir = "data/processed"
    os.makedirs(processed_dir, exist_ok=True)
    df.to_csv(os.path.join(processed_dir, "processed_credit_risk_dataset.csv"), index=False)

    # 6. Separate features and target
    X = df.drop(columns=["Decision"])
    y = df["Decision"]

    # Class imbalance calculation
    pos_count = (y == 1).sum()
    neg_count = (y == 0).sum()
    scale_pos_weight = (neg_count / pos_count) if pos_count > 0 else 1.0

    return X, y, scale_pos_weight


def get_train_test_split(X, y, test_size=0.2, random_state=42):
    return train_test_split(X, y, test_size=test_size, random_state=random_state, stratify=y)