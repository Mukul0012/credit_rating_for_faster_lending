import os
import joblib
import numpy as np
import pandas as pd
import xgboost as xgb
import shap


def predict_credit_decision(
    raw_applicant_data,
    model_path='models/xgboost_credit_model.json',
    encoder_path='models/encoder.pkl',
    threshold=0.55
):
    """
    Predicts loan approval for an individual customer and generates 
    exact model-driven reasons using SHAP feature attribution.
    """
    model = xgb.XGBClassifier()
    model.load_model(model_path)
    
    df = pd.DataFrame([raw_applicant_data])

    # 1. Feature Engineering matching data_preprocessing.py
    if 'Loan_Amount' in df.columns and 'Annual_Income' in df.columns:
        df['Debt_to_Income_Ratio'] = (df['Loan_Amount'] / (df['Annual_Income'] + 1)) * 100
        df['Loan_to_Income_Ratio'] = df['Loan_Amount'] / (df['Annual_Income'] + 1)

    if 'Annual_Income' in df.columns and 'Number_of_Dependents' in df.columns:
        df['Income_per_Dependent'] = df['Annual_Income'] / (df['Number_of_Dependents'] + 1)

    if 'Existing_Monthly_EMI' in df.columns and 'Annual_Income' in df.columns:
        df['EMI_Burden'] = df['Existing_Monthly_EMI'] / ((df['Annual_Income'] / 12) + 1)

    if 'Credit_Score' in df.columns and 'Debt_to_Income_Ratio' in df.columns:
        df['Risk_Score_Index'] = df['Credit_Score'] / (df['Debt_to_Income_Ratio'] + 1)

    if 'Current_Debt' in df.columns and 'Credit_Limit' in df.columns:
        df['Credit_Utilization'] = df['Current_Debt'] / (df['Credit_Limit'] + 1)

    # Log Transformations
    for col in ['Annual_Income', 'Loan_Amount', 'Total_Outstanding_Debt']:
        if col in df.columns:
            df[f'{col}_Log'] = np.log1p(np.maximum(0, df[col]))

    # 2. Categorical One-Hot Encoding
    categorical_cols = ['Employment_Type', 'Loan_Purpose']
    has_raw_strings = any(col in df.columns for col in categorical_cols)

    if has_raw_strings and os.path.exists(encoder_path):
        encoder = joblib.load(encoder_path)
        encoded_array = encoder.transform(df[categorical_cols])
        encoded_df = pd.DataFrame(encoded_array, columns=encoder.get_feature_names_out(categorical_cols))
        df = df.drop(columns=categorical_cols)
        df = pd.concat([df.reset_index(drop=True), encoded_df.reset_index(drop=True)], axis=1)

    # 3. Align features strictly with model feature order
    model_features = model.get_booster().feature_names
    if model_features:
        for col in model_features:
            if col not in df.columns:
                df[col] = 0.0
        df = df[model_features]

    # 4. Predict Approval Probability
    probability = float(model.predict_proba(df)[0][1])
    decision = "Approve" if probability >= threshold else "Reject"

    # 5. SHAP Individual Customer Explanation
    explainer = shap.TreeExplainer(model)
    shap_vals = explainer.shap_values(df)
    shap_array = shap_vals[0] if isinstance(shap_vals, list) else shap_vals[0]

    impact_df = pd.DataFrame({
        'Feature': df.columns,
        'Value': df.iloc[0].values,
        'SHAP_Impact': shap_array
    })

    impact_df['Abs_Impact'] = impact_df['SHAP_Impact'].abs()
    top_factors = impact_df.sort_values(by='Abs_Impact', ascending=False).head(5)

    reasons = []
    for _, row in top_factors.iterrows():
        feat = row['Feature']
        val = row['Value']
        impact = row['SHAP_Impact']

        if impact > 0:
            reasons.append(f"{feat} ({val:g}) -> Increased approval likelihood (+{impact:.3f})")
        else:
            reasons.append(f"{feat} ({val:g}) -> Decreased approval likelihood ({impact:.3f})")

    print(f"\n================ Customer Credit Decision ================")
    print(f"Final Decision:      {decision.upper()}")
    print(f"Approval Probability: {probability * 100:.2f}%")
    print("Top Decision Driving Factors (Model Explanations):")
    for r in reasons:
        print(f"  • {r}")
    print("==========================================================\n")

    return {
        "decision": decision,
        "probability": probability,
        "reasons": reasons
    }


if __name__ == "__main__":
    test_applicant = {
        'Age': 28, 'Annual_Income': 850000, 'Employment_Duration_Years': 5.0,
        'Number_of_Dependents': 1, 'Loan_Amount': 300000, 'Loan_Tenure_Months': 36,
        'Existing_Loans_Count': 0, 'Total_Outstanding_Debt': 0.0, 'Existing_Monthly_EMI': 0.0,
        'Debt_to_Income_Ratio': 10.5, 'Loan_to_Income_Ratio': 35.2, 'Credit_Utilization': 15.4,
        'Previous_Defaults': 0, 'Missed_Payments': 0, 'Maximum_Days_Past_Due': 0,
        'Recent_Credit_Enquiries': 1, 'Credit_History_Length': 4.5, 'Number_of_Credit_Accounts': 2,
        'Payment_History': 100.0, 'Credit_Score': 750,
        'Employment_Type_Business Owner': 0.0, 'Employment_Type_Contract': 0.0,
        'Employment_Type_Professional': 1.0, 'Employment_Type_Salaried': 0.0,
        'Employment_Type_Self-Employed': 0.0, 'Loan_Purpose_Business': 0.0,
        'Loan_Purpose_Consumer Durable': 0.0, 'Loan_Purpose_Education': 0.0,
        'Loan_Purpose_Home': 0.0, 'Loan_Purpose_Home Renovation': 0.0,
        'Loan_Purpose_Medical': 0.0, 'Loan_Purpose_Personal': 1.0,
        'Loan_Purpose_Vehicle': 0.0
    }
    predict_credit_decision(test_applicant)