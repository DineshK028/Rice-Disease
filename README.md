# Rice Disease Detection

A web application for detecting rice plant diseases from leaf images using deep learning (VGG16) for feature extraction and XGBoost for classification. The app provides a user-friendly interface for uploading images and receiving instant predictions.

---

## Features

- **Image Upload:** Upload rice leaf images via the web interface.
- **Disease Detection:** Classifies images into 8 categories:
  - Bacterial Leaf Blight
  - Brown Spot
  - Healthy
  - Leaf Blast
  - Leaf Scald
  - Narrow Brown Leaf Spot
  - Rice Hispa
  - Sheath Blight
- **Deep Learning:** Uses VGG16 for feature extraction.
- **XGBoost Classifier:** For accurate disease prediction.
- **REST API:** `/predict` endpoint for programmatic access.
- **Clean UI:** Built with Flask, HTML, CSS, and JavaScript.

---

## Project Structure

```
.
├── app.py                # Main Flask application
├── requirements.txt      # Python dependencies
├── models/               # Trained ML models (not included in repo)
├── uploads/              # Temporary image uploads (auto-created)
├── static/               # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/            # HTML templates
│   ├── index.html
│   └── analyze.html
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DineshK028/Rice-Disease.git
cd Rice-Disease
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv myenv
# On Windows:
myenv\Scripts\activate
# On Mac/Linux:
source myenv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Add Trained Models

- Place your trained XGBoost model (`rice_disease_xgboost_tuned.pkl`) and label encoder (`label_encoder_tuned.pkl`) in the `models/` directory.
- These files are required for predictions and are not included in the repository due to size.

### 5. Run the Application

```bash
python app.py
```

- The app will be available at `http://127.0.0.1:5000/`

---

## Usage

1. Open your browser and go to `http://127.0.0.1:5000/`
2. Use the interface to upload a rice leaf image.
3. View the predicted disease and confidence score.

---

## API Usage

- **Endpoint:** `/predict`
- **Method:** `POST`
- **Form Data:** `file` (image file)
- **Response:** JSON with prediction, confidence, and probabilities.

Example using `curl`:
```bash
curl -X POST -F "file=@path_to_image.jpg" http://127.0.0.1:5000/predict
```

---

## Notes

- The `uploads/` directory is used for temporary storage and is auto-cleaned after prediction.
- The `models/` directory is in `.gitignore` to avoid pushing large files.
- For best results, use clear images of rice leaves.

---

## License

This project is for educational and research purposes.

---

## Acknowledgements

- VGG16: Keras Applications
- XGBoost: https://xgboost.readthedocs.io/
- Flask: https://flask.palletsprojects.com/
