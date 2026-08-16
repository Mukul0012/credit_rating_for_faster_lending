import pandas as pd
import numpy as np
import matplotlib.pyplot as plt



df = pd.read_csv("credit_dataset_cleaned.csv")



print(df.head())



print(df.info())




print("\nNumerical columns:")
print(df.select_dtypes(include=np.number).columns.tolist())

print("\nCategorical columns:")
print(df.select_dtypes(include="object").columns.tolist())



print(df.describe().T)



print(df["Decision"].value_counts())



df["Decision"].value_counts().plot(
    kind="bar",
    figsize=(6, 4)
)

plt.title("Loan Decision Distribution")
plt.xlabel("Decision")
plt.ylabel("Number of Applications")
plt.xticks(rotation=0)
plt.show()



numerical_features = df.select_dtypes(
    include=np.number
).columns.tolist()

numerical_features.remove("Decision")

print(numerical_features)



for column in numerical_features:
    plt.figure(figsize=(6, 4))

    plt.hist(df[column], bins=30)

    plt.title(f"Distribution of {column}")
    plt.xlabel(column)
    plt.ylabel("Frequency")

    plt.tight_layout()
    plt.show()



print(df["Employment_Type"].value_counts())



df["Employment_Type"].value_counts().plot(
    kind="bar",
    figsize=(7, 4)
)

plt.title("Employment Type Distribution")
plt.xlabel("Employment Type")
plt.ylabel("Number of Applicants")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()




print(df["Loan_Purpose"].value_counts())



df["Loan_Purpose"].value_counts().plot(
    kind="bar",
    figsize=(8, 4)
)

plt.title("Loan Purpose Distribution")
plt.xlabel("Loan Purpose")
plt.ylabel("Number of Applications")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()



df.boxplot(
    column="Debt_to_Income_Ratio",
    by="Decision",
    figsize=(7, 5)
)

plt.title("Debt-to-Income Ratio vs Loan Decision")
plt.suptitle("")
plt.xlabel("Decision")
plt.ylabel("Debt-to-Income Ratio")

plt.show()



df.boxplot(
    column="Credit_Score",
    by="Decision",
    figsize=(7, 5)
)

plt.title("Credit Score vs Loan Decision")
plt.suptitle("")
plt.xlabel("Decision")
plt.ylabel("Credit Score")

plt.show()




default_decision = pd.crosstab(
    df["Previous_Defaults"],
    df["Decision"],
    normalize="index"
) * 100

print(default_decision.round(2))



default_decision.plot(
    kind="bar",
    figsize=(8, 5)
)

plt.title("Previous Defaults vs Loan Decision")
plt.xlabel("Previous Defaults")
plt.ylabel("Percentage")
plt.xticks(rotation=0)

plt.legend(title="Decision")
plt.tight_layout()
plt.show()


missed_payment_decision = pd.crosstab(
    df["Missed_Payments"],
    df["Decision"],
    normalize="index"
) * 100

print(missed_payment_decision.round(2))





missed_payment_decision.plot(
    kind="bar",
    figsize=(8, 5)
)

plt.title("Missed Payments vs Loan Decision")
plt.xlabel("Missed Payments")
plt.ylabel("Percentage")
plt.xticks(rotation=0)

plt.legend(title="Decision")
plt.tight_layout()
plt.show()





correlation_matrix = df[numerical_features + ["Decision"]].corr()

plt.figure(figsize=(14, 10))

plt.imshow(
    correlation_matrix,
    aspect="auto"
)

plt.colorbar()

plt.xticks(
    range(len(correlation_matrix.columns)),
    correlation_matrix.columns,
    rotation=90
)

plt.yticks(
    range(len(correlation_matrix.columns)),
    correlation_matrix.columns
)

plt.title("Correlation Matrix")

plt.tight_layout()
plt.show()



decision_correlation = (
    correlation_matrix["Decision"]
    .drop("Decision")
    .sort_values(key=abs, ascending=False)
)

print(decision_correlation)




feature_correlation = df[numerical_features].corr()

high_correlations = []

for i in range(len(feature_correlation.columns)):
    for j in range(i + 1, len(feature_correlation.columns)):

        correlation = feature_correlation.iloc[i, j]

        if abs(correlation) >= 0.80:
            high_correlations.append(
                (
                    feature_correlation.columns[i],
                    feature_correlation.columns[j],
                    correlation
                )
            )

print(high_correlations)



high_corr_df = pd.DataFrame(
    high_correlations,
    columns=["Feature_1", "Feature_2", "Correlation"]
)

high_corr_df = high_corr_df.sort_values(
    by="Correlation",
    key=abs,
    ascending=False
)

print(high_corr_df)

