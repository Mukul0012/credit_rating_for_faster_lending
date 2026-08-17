import json
from pathlib import Path

import joblib
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent

MODEL_PATH = PROJECT_ROOT / "models" / "decision_tree.pkl"
SCHEMA_PATH = PROJECT_ROOT / "models" / "feature_schema.json"

LOW_THRESHOLD = 0.30
HIGH_THRESHOLD = 0.60

def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Final model not found at: {MODEL_PATH}"
        )

    return joblib.load(MODEL_PATH)

def load_feature_schema():

    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(
            f"Feature schema not found at: {SCHEMA_PATH}"
        )

    with open(SCHEMA_PATH, "r", encoding="utf-8") as file:
        return json.load(file)

def validate_input(applicant_data, schema):
 
    if not isinstance(applicant_data, dict):
        raise TypeError(
            "applicant_data must be provided as a dictionary."
        )

    required_features = schema["features"]
    expected_dtypes = schema["dtypes"]

    input_features = set(applicant_data.keys())
    required_feature_set = set(required_features)

    missing_features = sorted(
        required_feature_set - input_features
    )

    if missing_features:
        raise ValueError(
            "Missing required features: "
            + ", ".join(missing_features)
        )

    unexpected_features = sorted(
        input_features - required_feature_set
    )

    if unexpected_features:
        raise ValueError(
            "Unexpected features provided: "
            + ", ".join(unexpected_features)
        )

    for feature in required_features:

        value = applicant_data[feature]
        expected_dtype = expected_dtypes[feature]

        if value is None:
            raise ValueError(
                f"Feature '{feature}' cannot be None."
            )

        if isinstance(value, bool):
            raise TypeError(
                f"Feature '{feature}' must be numeric "
                f"({expected_dtype}), not bool."
            )

        if isinstance(value, str):
            raise TypeError(
                f"Feature '{feature}' must be numeric "
                f"({expected_dtype}), not str."
            )

        if expected_dtype in ("float64", "int64"):

            if not isinstance(value, (int, float)):
                raise TypeError(
                    f"Feature '{feature}' must be numeric "
                    f"({expected_dtype}). "
                    f"Received: {type(value).__name__}"
                )

            try:
                numeric_value = float(value)
            except (TypeError, ValueError):
                raise TypeError(
                    f"Feature '{feature}' must contain a "
                    f"valid numeric value."
                )

            if pd.isna(numeric_value):
                raise ValueError(
                    f"Feature '{feature}' cannot be NaN."
                )

            if numeric_value in (
                float("inf"),
                float("-inf")
            ):
                raise ValueError(
                    f"Feature '{feature}' cannot be infinite."
                )

        else:
            raise ValueError(
                f"Unsupported dtype '{expected_dtype}' "
                f"defined for feature '{feature}'."
            )

def build_model_input(applicant_data, schema):

    feature_names = schema["features"]
    expected_dtypes = schema["dtypes"]

    X = pd.DataFrame(
        [
            {
                feature: applicant_data[feature]
                for feature in feature_names
            }
        ],
        columns=feature_names,
    )


    for feature in feature_names:

        expected_dtype = expected_dtypes[feature]

        if expected_dtype == "float64":

            X[feature] = X[feature].astype("float64")

        elif expected_dtype == "int64":

            value = applicant_data[feature]

            if isinstance(value, float) and not value.is_integer():
                raise TypeError(
                    f"Feature '{feature}' must be an integer "
                    f"because its expected dtype is int64."
                )

            X[feature] = X[feature].astype("int64")

        else:
            raise ValueError(
                f"Unsupported dtype '{expected_dtype}' "
                f"for feature '{feature}'."
            )

    return X


def validate_model_schema(model, schema):

    expected_features = schema["features"]
    expected_count = schema["n_features"]

    if len(expected_features) != expected_count:
        raise ValueError(
            "Feature schema is internally inconsistent: "
            f"n_features={expected_count}, "
            f"but {len(expected_features)} features were found."
        )

    if hasattr(model, "n_features_in_"):

        if model.n_features_in_ != expected_count:
            raise ValueError(
                "Model/schema feature-count mismatch: "
                f"model expects {model.n_features_in_} features, "
                f"schema defines {expected_count} features."
            )

    if not hasattr(model, "classes_"):
        raise ValueError(
            "Loaded model does not expose classes_. "
            "Cannot safely identify the default probability."
        )

    if 1 not in model.classes_:
        raise ValueError(
            "Default class 1 was not found in model.classes_. "
            "The target encoding does not match the project "
            "definition of 1 = default."
        )

def assign_risk_level(pd_value):

    if not isinstance(pd_value, (int, float)):
        raise TypeError(
            "pd_value must be numeric."
        )

    if pd_value < 0 or pd_value > 1:
        raise ValueError(
            "Probability of Default must be between 0 and 1."
        )

    if pd_value < LOW_THRESHOLD:
        return "LOW"

    elif pd_value < HIGH_THRESHOLD:
        return "MEDIUM"

    else:
        return "HIGH"


def predict_credit_risk(applicant_data):

    model = load_model()
    schema = load_feature_schema()

    validate_model_schema(model, schema)

    validate_input(
        applicant_data,
        schema
    )

    X = build_model_input(
        applicant_data,
        schema
    )

    probabilities = model.predict_proba(X)

    default_class_index = list(model.classes_).index(1)

    probability_of_default = float(
        probabilities[0][default_class_index]
    )

    if not 0.0 <= probability_of_default <= 1.0:
        raise ValueError(
            "Model returned an invalid probability of default: "
            f"{probability_of_default}"
        )

    risk_level = assign_risk_level(
        probability_of_default
    )

    return {
        "probability_of_default": round(
            probability_of_default,
            6
        ),
        "risk_level": risk_level
    }