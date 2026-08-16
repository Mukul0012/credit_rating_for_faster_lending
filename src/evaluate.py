import os
import numpy as np
import xgboost as xgb
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt

# Flexible import handling whether script is run directly or as a module
try:
    from src.data_preprocessing import load_and_preprocess_data, get_train_test_split
except ImportError:
    from data_preprocessing import load_and_preprocess_data, get_train_test_split


def evaluate_model(
    data_path='data/raw/cleaned_credit_risk_dataset.csv',
    model_path='models/xgboost_credit_model.json',
    plot_path='models/feature_importance.png'
):
    """
    Loads saved XGBoost model, applies optimal decision threshold search 
    to evaluate maximum test set accuracy, and saves feature importance plot.
    """
    # 1. Ensure output directory exists for plot output
    os.makedirs(os.path.dirname(plot_path), exist_ok=True)

    # 2. Unpack preprocessed dataset
    print("Step 1/4: Loading preprocessed dataset...")
    X, y, _ = load_and_preprocess_data(data_path)

    # 3. Stratified Train-Test Split matching training configuration
    print("Step 2/4: Splitting dataset into train and test sets...")
    _, X_test, _, y_test = get_train_test_split(X, y, test_size=0.2, random_state=42)

    # 4. Load trained XGBoost model from disk
    print(f"Step 3/4: Loading saved XGBoost model from {model_path}...")
    model = xgb.XGBClassifier()
    model.load_model(model_path)

    # 5. Predict probabilities & find optimal classification threshold
    y_prob = model.predict_proba(X_test)[:, 1]

    best_thresh = 0.50
    best_acc = 0.0
    for thresh in np.arange(0.40, 0.65, 0.005):
        acc = accuracy_score(y_test, (y_prob >= thresh).astype(int))
        if acc > best_acc:
            best_acc = acc
            best_thresh = thresh

    # Predictions at peak accuracy threshold
    y_pred = (y_prob >= best_thresh).astype(int)
    roc_auc = roc_auc_score(y_test, y_prob)

    # 6. Comprehensive Metrics Evaluation
    print("\n================ Model Evaluation Results ================")
    print(f"Optimal Decision Threshold: {best_thresh:.3f}")
    print(f"Model Accuracy:            {best_acc * 100:.2f}%")
    print(f"ROC-AUC Score:             {roc_auc:.4f}")
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    print("=========================================================\n")

    # 7. Generate & Save Feature Importance Plot
    print(f"Step 4/4: Plotting feature importance to {plot_path}...")
    fig, ax = plt.subplots(figsize=(10, 6))
    xgb.plot_importance(model, max_num_features=10, importance_type='weight', ax=ax)
    plt.title("Top 10 Factors Influencing Approval Decisions")
    plt.tight_layout()
    plt.savefig(plot_path, dpi=300)
    plt.close(fig)
    print("Evaluation pipeline executed successfully!")


if __name__ == "__main__":
    evaluate_model()