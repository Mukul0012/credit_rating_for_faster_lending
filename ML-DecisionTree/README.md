# Credit Lending — Decision Tree ML Component

## Overview

This repository contains the trained Decision Tree machine learning component for the Credit Lending project.

The ML component is responsible for:

* Validating applicant input
* Preparing input features in the expected format
* Loading the trained Decision Tree model
* Generating the loan decision prediction
* Returning the prediction output for backend integration

## Project Structure

```text
ML/
│
├── models/
│   ├── decision_tree.pkl
│   └── feature_schema.json
│
├── src/
│   └── predict.py
│
├── requirements.txt
├── README.md
└── .gitignore
```

> **Note on Local Development & Workflow Artifacts:**  
> The `notebooks/` directory (containing the 8 sequential ML workflow notebooks), dataset files (`data/`), generated prediction outputs (`outputs/`), evaluation reports (`reports/`), and intermediate model checkpoints (`decision_tree_baseline.pkl`, `decision_tree_final.pkl`, etc.) serve as local development and documentation artifacts. They are intentionally listed in `.gitignore` and excluded from the remote Git repository.

## Model

**Algorithm:** Decision Tree Classifier

The trained model is stored at:

```text
models/decision_tree.pkl
```

The model was trained, evaluated, tuned, and saved using the project's ML workflow.

## Feature Schema

The expected input features are defined in:

```text
models/feature_schema.json
```

The backend should use the schema as the reference for:

* Required feature names
* Expected data types
* Valid input values
* Feature structure

Do not change feature names or their expected representation without coordinating with the ML component.

## Prediction Pipeline

The reusable inference pipeline is located at:

```text
src/predict.py
```

The intended flow is:

```text
Applicant Input
      ↓
Input Validation
      ↓
Feature Preparation
      ↓
Load Trained Model
      ↓
Prediction
      ↓
Prediction Output
```

The backend application should use this prediction pipeline rather than directly loading or manipulating the model inside backend business logic.

## Installation

Create and activate a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Model Usage

The backend integration should call the inference functionality provided by:

```text
src/predict.py
```

and consume the prediction returned by the ML pipeline.

### Prediction Output Format

`predict_credit_risk(applicant_data)` returns a dictionary containing the estimated Probability of Default and assigned risk level:

```json
{
    "probability_of_default": 0.791416,
    "risk_level": "HIGH"
}
```

### Risk Level Policy Thresholds

- **LOW**: `probability_of_default < 0.30`
- **MEDIUM**: `0.30 <= probability_of_default < 0.60`
- **HIGH**: `probability_of_default >= 0.60`

## Important Integration Notes

* `models/decision_tree.pkl` is the trained production model.
* `models/feature_schema.json` defines the expected input structure.
* `src/predict.py` contains the inference logic.
* The backend should not retrain the model.
* The backend should not modify the `.pkl` model file.
* Input validation should be performed before prediction.
* Any changes to the feature schema must be coordinated between the ML and backend components.

## Dependencies

Required Python dependencies are listed in:

```text
requirements.txt
```

Install them using:

```bash
pip install -r requirements.txt
```

## ML → Backend Handoff

The backend developer needs the following files:

```text
models/decision_tree.pkl
models/feature_schema.json
src/predict.py
requirements.txt
```

These files together form the reusable ML inference component required for backend integration.
