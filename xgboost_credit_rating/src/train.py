import os
import numpy as np
import xgboost as xgb

try:
    from xgboost_credit_rating.src.data_preprocessing import load_and_preprocess_data, get_train_test_split
except ImportError:
    from src.data_preprocessing import load_and_preprocess_data, get_train_test_split


def train_model(
    data_path="xgboost_credit_rating/data/raw/cleaned_credit_risk_dataset.csv",
    model_output_path="xgboost_credit_rating/models/xgboost_credit_model.json"
):
    """
    Preprocesses dataset, fits the regularized XGBoost classifier, 
    and saves the trained model artifact to disk.
    """
    os.makedirs(os.path.dirname(model_output_path), exist_ok=True)

    print("Step 1/3: Preprocessing dataset...")
    X, y, scale_pos_weight = load_and_preprocess_data(data_path)

    print("Step 2/3: Splitting dataset into train and test sets...")
    X_train, X_test, y_train, y_test = get_train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print("Step 3/3: Training XGBoost model...")
    model = xgb.XGBClassifier(
        n_estimators=450,
        max_depth=5,
        learning_rate=0.02,
        subsample=0.85,
        colsample_bytree=0.75,
        gamma=1.5,
        reg_alpha=0.5,
        reg_lambda=2.0,
        min_child_weight=3,
        scale_pos_weight=np.sqrt(scale_pos_weight),
        eval_metric="logloss",
        random_state=42
    )

    model.fit(
        X_train,
        y_train,
        eval_set=[(X_test, y_test)],
        verbose=False
    )

    model.save_model(model_output_path)
    print(f"Training complete. Model saved to {model_output_path}")


if __name__ == "__main__":
    train_model()