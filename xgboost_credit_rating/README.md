# 💳 XGBoost Credit Rating & Risk Scoring System

An enterprise-ready, explainable machine learning pipeline designed for automated credit decisioning and risk assessment. Built with **XGBoost** and **SHAP (SHapley Additive exPlanations)**, this system translates complex financial data into high-accuracy loan decisions accompanied by individual, model-driven decision reasons.

---

## 🌟 Key Technical Highlights

* **🔍 Explainable AI (SHAP Integration):** Replaces static, hardcoded rules with true model-driven feature attribution. Every applicant receives a personalized decision breakdown showing the exact mathematical impact (+ or -) each metric had on their approval probability.
* **📐 Domain Financial Feature Engineering:** Automatically computes financial interaction ratios—such as `Debt_to_Income_Ratio`, `EMI_Burden`, `Loan_to_Income_Ratio`, and `Risk_Score_Index`—alongside log transformations on highly skewed monetary variables (`Annual_Income`, `Loan_Amount`).
* **⚖️ Imbalance Resilient & Regularized:** Handles class imbalance using moderated `scale_pos_weight` and prevents overfitting across noisy financial data through L1 (`reg_alpha`) and L2 (`reg_lambda`) regularization parameters.
* **🎯 Dynamic Threshold Tuning:** Scans probability scores during evaluation to identify optimal decision boundaries, maximizing overall classification accuracy while preserving strong ROC-AUC performance (~0.87).
* **🧱 Clean Production Architecture:** Fully modularized pipeline with distinct responsibility separation across preprocessing, training, evaluation, and single-customer inference.

---

## 📁 Repository Structure

```text
xgboost-credit-rating/
├── data/
│   └── raw/
│       └── cleaned_credit_risk_dataset.csv
├── models/
│   ├── encoder.pkl                     # Fitted OneHotEncoder for categoricals
│   ├── xgboost_credit_model.json       # Trained XGBoost model artifact
│   └── feature_importance.png          # Visual feature importance output
├── notebooks/                          # Prototyping & EDA notebooks
├── src/
│   ├── __init__.py                     # Package init & module exports
│   ├── data_preprocessing.py           # Ingestion, mapping, ratios & encoding
│   ├── train.py                        # Model fitting & artifact serialization
│   ├── evaluate.py                     # Metric reporting & importance plotting
│   └── predict.py                      # Real-time inference & SHAP explanations
├── requirements.txt
└── README.md