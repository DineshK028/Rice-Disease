from flask import Flask, request, jsonify, render_template
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
import joblib

app = Flask(__name__)

# Create necessary directories
os.makedirs('models', exist_ok=True)
os.makedirs('uploads', exist_ok=True)

# Image size for VGG16
IMG_SIZE = 224

# ✅ Update class labels (must match your trained model exactly)
CLASSES = [
    'Bacterial Leaf Blight',
    'Brown Spot',
    'Healthy',
    'Leaf Blast',
    'Leaf Scald',
    'Narrow Brown Leaf Spot',
    'Rice Hispa',
    'Sheath Blight'
]

# Load trained models
try:
    xgb_model = joblib.load('models/rice_disease_xgboost_tuned.pkl')
    label_encoder = joblib.load('models/label_encoder_tuned.pkl')
    models_loaded = True
except Exception as e:
    print(f"Error loading models: {e}")
    models_loaded = False

# Feature extractor using VGG16
def extract_features(img_array):
    base_model = tf.keras.applications.VGG16(weights='imagenet', include_top=False, pooling=None)
    features = base_model.predict(img_array, verbose=0)
    return features.flatten().reshape(1, -1)

# Image preprocessing
def load_and_preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze')
def analyze():
    return render_template('analyze.html')

@app.route('/predict', methods=['POST'])
def predict():
    if not models_loaded:
        return jsonify({'error': 'Model or encoder not loaded.'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join('uploads', filename)
        file.save(filepath)

        # Process image
        img_array = load_and_preprocess_image(filepath)
        features = extract_features(img_array)

        # Predict
        xgb_predictions = xgb_model.predict_proba(features)[0]
        predicted_class_index = np.argmax(xgb_predictions)
        predicted_class = label_encoder.inverse_transform([predicted_class_index])[0]
        confidence = float(np.max(xgb_predictions))

        os.remove(filepath)

        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'probabilities': {
                class_name: float(prob)
                for class_name, prob in zip(label_encoder.classes_, xgb_predictions)
            },
            'model': 'XGBoost with VGG16 features'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
