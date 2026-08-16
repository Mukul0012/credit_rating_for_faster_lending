import pandas as pd
from sklearn.preprocessing import OneHotEncoder
import joblib
import os

# Define the categorical options present in the dataset
employment_types = ['Business Owner', 'Contract', 'Professional', 'Salaried', 'Self-Employed']
loan_purposes = ['Business', 'Consumer Durable', 'Education', 'Home', 'Home Renovation', 'Medical', 'Personal', 'Vehicle']

# Create sample data representing all category combinations
sample_data = pd.DataFrame({
    'Employment_Type': employment_types * 8,
    'Loan_Purpose': loan_purposes * 5
})

# Initialize and fit OneHotEncoder
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoder.fit(sample_data[['Employment_Type', 'Loan_Purpose']])

# Save the binary object to disk
os.makedirs('models', exist_ok=True)
joblib.dump(encoder, 'models/encoder.pkl')
print("Successfully generated models/encoder.pkl!")