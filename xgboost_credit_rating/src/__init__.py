"""
XGBoost Credit Rating System
"""

from .data_preprocessing import load_and_preprocess_data, get_train_test_split
from .predict import predict_credit_decision

__version__ = "1.0.0"
__all__ = [
    "load_and_preprocess_data",
    "get_train_test_split",
    "predict_credit_decision",
]