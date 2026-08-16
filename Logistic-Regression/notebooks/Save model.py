

import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

import joblib





df = pd.read_csv("credit_dataset_cleaned.csv")

print(df.shape)





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





X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)





categorical_features = [
    "Employment_Type",
    "Loan_Purpose"
]

numerical_features = [
    col for col in features
    if col not in categorical_features
]

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

print("Model trained successfully.")





joblib.dump(logistic_model,"models/logistic_regression_model.pkl")

print("Logistic Regression model saved successfully.")





import os

model_path = "models/logistic_regression_model.pkl"

print("File exists:", os.path.exists(model_path))
print("File size:", os.path.getsize(model_path), "bytes")





loaded_model = joblib.load(
    "models/logistic_regression_model.pkl"
)

print("Model loaded successfully.")





test_predictions = loaded_model.predict(X_test)

print("First 10 predictions:")
print(test_predictions[:10])





test_probabilities = loaded_model.predict_proba(X_test)

print("First 5 probability predictions:")
print(test_probabilities[:5])





from sklearn.metrics import accuracy_score

loaded_accuracy = accuracy_score(
    y_test,
    test_predictions
)

print("Loaded Model Accuracy:", round(loaded_accuracy, 4))







