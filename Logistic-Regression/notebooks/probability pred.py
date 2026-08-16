
import pandas as pd
import joblib





model = joblib.load("models/logistic_regression_model.pkl")


print("Model loaded successfully.")





df = pd.read_csv("credit_dataset_cleaned.csv")

print("Dataset shape:", df.shape)





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





probabilities = model.predict_proba(X)

reject_probability = probabilities[:, 0]
approve_probability = probabilities[:, 1]





probability_df = pd.DataFrame({
    "Reject_Probability": reject_probability,
    "Approve_Probability": approve_probability
})

print(probability_df.head(10))





probability_df["Reject_Probability"] = (
    probability_df["Reject_Probability"] * 100
).round(2)

probability_df["Approve_Probability"] = (
    probability_df["Approve_Probability"] * 100
).round(2)

print(probability_df.head(10))





predicted_decision = model.predict(X)





probability_df["Predicted_Decision"] = predicted_decision





print(probability_df.head(10))





probability_df["Probability_Sum"] = (
    probability_df["Reject_Probability"] +
    probability_df["Approve_Probability"]
).round(2)

print(probability_df.head(10))





print(
    "All probabilities sum to 100%:",
    (probability_df["Probability_Sum"] == 100.0).all()
)







