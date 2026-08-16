Credit Risk Lending Prediction System

A machine learning project that predicts loan approval/rejection and estimates credit risk using Logistic Regression.

Features
Data preprocessing and cleaning
Exploratory Data Analysis (EDA)
Numerical feature scaling using StandardScaler
Categorical feature encoding using OneHotEncoder
Logistic Regression model
Model evaluation using Accuracy, Precision, Recall, F1-Score and ROC-AUC
Approval and rejection probability prediction
Risk scoring and lending recommendation
Model

Algorithm: Logistic Regression
Train-Test Split: 80:20
Classification Threshold: Default 0.5

Risk Scoring
0–30: Low Risk → Approve
31–60: Medium Risk → Review
61–100: High Risk → Reject
Technologies

Python, Pandas, NumPy, Scikit-learn, Matplotlib, Joblib

Project Structure
notebooks/ – Data preprocessing, EDA, model training, evaluation and risk scoring
models/ – Trained Logistic Regression model
app/ – Application files
outputs/ – Generated outputs
credit_dataset.csv – Original dataset
credit_dataset_cleaned.csv – Cleaned dataset