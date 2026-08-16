import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report,
    ConfusionMatrixDisplay,
    RocCurveDisplay
)

import matplotlib.pyplot as plt


df = pd.read_csv("credit_dataset_cleaned.csv")



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


y_pred = logistic_model.predict(X_test)

y_prob = logistic_model.predict_proba(X_test)[:, 1]



accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_prob)

print("Logistic Regression Performance")
print("--------------------------------")
print("Accuracy :", round(accuracy, 4))
print("Precision:", round(precision, 4))
print("Recall   :", round(recall, 4))
print("F1 Score :", round(f1, 4))
print("ROC-AUC  :", round(roc_auc, 4))



cm = confusion_matrix(y_test, y_pred)

print("Confusion Matrix:")
print(cm)


disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=["Reject", "Approve"]
)

disp.plot()

plt.title("Logistic Regression - Confusion Matrix")
plt.show()



print(classification_report(
    y_test,
    y_pred,
    target_names=["Reject", "Approve"]
))



RocCurveDisplay.from_predictions(
    y_test,
    y_prob
)

plt.title("Logistic Regression - ROC Curve")
plt.show()




print("ROC-AUC:", round(roc_auc_score(y_test, y_prob), 4))

