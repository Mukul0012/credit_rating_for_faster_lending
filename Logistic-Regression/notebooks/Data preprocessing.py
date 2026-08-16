
import pandas as pd
import numpy as np

df = pd.read_csv("credit_dataset.csv")


print("Rows:", df.shape[0])
print("Columns:", df.shape[1])


print(df.columns.tolist())


print(df.info())
print(df.head())
print(df.describe())


missing_values = df.isnull().sum()

print(missing_values)


missing_percentage = (df.isnull().sum() / len(df)) * 100

print(missing_percentage.sort_values(ascending=False))

print("Duplicate rows:", df.duplicated().sum())

print("Duplicate Application IDs:", df["Application_ID"].duplicated().sum())


print(df["Decision"].value_counts())


df["Decision"] = (
    df["Decision"]
    .astype(str)
    .str.strip()
    .str.lower()
)


df["Decision"] = df["Decision"].map({
    "reject": 0,
    "approve": 1
})


print(df["Decision"].value_counts())


columns_to_remove = [
    "Application_ID",
    "City",
    "Gender",
    "Risk_Grade"
]

df_clean = df.drop(columns=columns_to_remove)

print(df_clean.columns.tolist())


print(df_clean.dtypes)



categorical_columns = df_clean.select_dtypes(
    include=["object"]
).columns.tolist()

print("Categorical columns:")
print(categorical_columns)


numerical_columns = df_clean.select_dtypes(
    exclude=["object"]
).columns.tolist()

print("Numerical columns:")
print(numerical_columns)


print("Final shape:", df_clean.shape)

print("\nMissing values:")
print(df_clean.isnull().sum().sum())

print("\nDuplicate rows:")
print(df_clean.duplicated().sum())


df_clean.to_csv(
    "credit_dataset_cleaned.csv",
    index=False
)

print("Cleaned dataset saved successfully.")

