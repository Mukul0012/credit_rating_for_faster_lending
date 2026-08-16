
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression



df = pd.read_csv("credit_dataset_cleaned.csv")

print("Shape:", df.shape)
print(df.head())



features = [
    "Age",
    "Employment_Type",
    "Annual_Income",
    "Employment_Duration_Years",
    "Number_of_Dependents",
    "Loan_Purpose",
    "Loan_Amount",
    "Loan_Tenure_Months",
    "Existing_Loans_Count",
    "Total_Outstanding_Debt",
    "Existing_Monthly_EMI",
    "Debt_to_Income_Ratio",
    "Loan_to_Income_Ratio",
    "Credit_Utilization",
    "Previous_Defaults",
    "Missed_Payments",
    "Maximum_Days_Past_Due",
    "Recent_Credit_Enquiries",
    "Credit_History_Length",
    "Number_of_Credit_Accounts",
    "Payment_History",
    "Credit_Score"
]

X = df[features]
y = df["Decision"]



print("X shape:", X.shape)
print("y shape:", y.shape)

print("\nTarget distribution:")
print(y.value_counts())



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)



print("Training data:", X_train.shape)
print("Testing data:", X_test.shape)

print("\nTraining target distribution:")
print(y_train.value_counts())

print("\nTesting target distribution:")
print(y_test.value_counts())



categorical_features = [
    "Employment_Type",
    "Loan_Purpose"
]

numerical_features = [
    col for col in features
    if col not in categorical_features
]

print("Categorical features:")
print(categorical_features)

print("\nNumber of numerical features:", len(numerical_features))
print(numerical_features)





preprocessor = ColumnTransformer(
    transformers=[
        (
            "num",
            StandardScaler(),
            numerical_features
        ),
        (
            "cat",
            OneHotEncoder(
                handle_unknown="ignore",
                drop="first"
            ),
            categorical_features
        )
    ]
)





logistic_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            LogisticRegression(
                max_iter=1000,
                random_state=42
            )
        )
    ]
)





logistic_model.fit(X_train, y_train)

print("Logistic Regression trained successfully.")





y_pred = logistic_model.predict(X_test)

print("Predictions generated successfully.")





y_prob = logistic_model.predict_proba(X_test)[:, 1]

print("First 10 approval probabilities:")
print(y_prob[:10])






