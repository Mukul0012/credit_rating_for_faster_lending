
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

approve_probability = probabilities[:, 1]

print(approve_probability[:10])





reject_probability = probabilities[:, 0]

print(reject_probability[:10])





risk_score = reject_probability * 100

risk_score = risk_score.round(2)





def risk_category(score):
    if score <= 30:
        return "Low Risk"
    elif score <= 60:
        return "Medium Risk"
    else:
        return "High Risk"





risk_categories = [
    risk_category(score)
    for score in risk_score
]





risk_df = pd.DataFrame({
    "Approve_Probability": (
        approve_probability * 100
    ).round(2),

    "Reject_Probability": (
        reject_probability * 100
    ).round(2),

    "Risk_Score": risk_score,

    "Risk_Category": risk_categories
})

print(risk_df.head(10))





def lending_recommendation(category):
    if category == "Low Risk":
        return "Approve"
    elif category == "Medium Risk":
        return "Review"
    else:
        return "Reject"





recommendations = [
    lending_recommendation(category)
    for category in risk_categories
]





risk_df["Lending_Recommendation"] = recommendations

print(risk_df.head(10))





print("Risk Category Distribution:")
print(risk_df["Risk_Category"].value_counts())





print("\nLending Recommendation Distribution:")
print(risk_df["Lending_Recommendation"].value_counts())





