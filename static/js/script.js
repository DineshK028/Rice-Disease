// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Language Switching
function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    const translations = {
        en: {
            uploadTitle: 'Upload Rice Plant Image',
            uploadDescription: 'Upload an image of a rice plant leaf to detect diseases',
            uploadText: 'Click to upload image',
            analyzeText: 'Analyze Image',
            resultTitle: 'Analysis Result',
            aboutTitle: 'About Our Technology',
            aboutDescription: 'Our Rice Plant Disease Detection system uses advanced AI technology to identify diseases in rice plants. We combine deep learning with traditional machine learning to provide accurate results.',
            algorithmsTitle: 'Algorithms Used',
            vgg16Desc: 'Deep learning model for feature extraction',
            xgboostDesc: 'Gradient boosting for classification',
            cnnDesc: 'Convolutional Neural Networks for image processing'
        },
        hi: {
            uploadTitle: 'चावल के पौधे की छवि अपलोड करें',
            uploadDescription: 'रोगों का पता लगाने के लिए चावल के पौधे की पत्ती की छवि अपलोड करें',
            uploadText: 'छवि अपलोड करने के लिए क्लिक करें',
            analyzeText: 'छवि का विश्लेषण करें',
            resultTitle: 'विश्लेषण परिणाम',
            aboutTitle: 'हमारी तकनीक के बारे में',
            aboutDescription: 'हमारी चावल के पौधे की बीमारी पहचान प्रणाली उन्नत एआई तकनीक का उपयोग करती है। हम सटीक परिणाम प्रदान करने के लिए डीप लर्निंग को पारंपरिक मशीन लर्निंग के साथ जोड़ते हैं।',
            algorithmsTitle: 'उपयोग किए गए एल्गोरिदम',
            vgg16Desc: 'फीचर एक्सट्रैक्शन के लिए डीप लर्निंग मॉडल',
            xgboostDesc: 'वर्गीकरण के लिए ग्रेडिएंट बूस्टिंग',
            cnnDesc: 'छवि प्रसंस्करण के लिए कन्वोल्यूशनल न्यूरल नेटवर्क'
        },
        kn: {
            uploadTitle: 'ಅಕ್ಕಿ ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            uploadDescription: 'ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಅಕ್ಕಿ ಸಸ್ಯದ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            uploadText: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
            analyzeText: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
            resultTitle: 'ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ',
            aboutTitle: 'ನಮ್ಮ ತಂತ್ರಜ್ಞಾನದ ಬಗ್ಗೆ',
            aboutDescription: 'ನಮ್ಮ ಅಕ್ಕಿ ಸಸ್ಯ ರೋಗ ಪತ್ತೆಹಚ್ಚುವ ವ್ಯವಸ್ಥೆ ಸುಧಾರಿತ ಎಐ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸುತ್ತದೆ. ನಾವು ನಿಖರವಾದ ಫಲಿತಾಂಶಗಳನ್ನು ಒದಗಿಸಲು ಡೀಪ್ ಲರ್ನಿಂಗ್ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಅನ್ನು ಸಂಯೋಜಿಸುತ್ತೇವೆ.',
            algorithmsTitle: 'ಬಳಸಿದ ಆಲ್ಗೋರಿದಮ್‌ಗಳು',
            vgg16Desc: 'ಫೀಚರ್ ಎಕ್ಸ್‌ಟ್ರಾಕ್ಷನ್‌ಗಾಗಿ ಡೀಪ್ ಲರ್ನಿಂಗ್ ಮಾಡೆಲ್',
            xgboostDesc: 'ವರ್ಗೀಕರಣಕ್ಕಾಗಿ ಗ್ರೇಡಿಯಂಟ್ ಬೂಸ್ಟಿಂಗ್',
            cnnDesc: 'ಚಿತ್ರ ಸಂಸ್ಕರಣೆಗಾಗಿ ಕನ್ವೊಲ್ಯೂಷನಲ್ ನ್ಯೂರಲ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು'
        }
    };

    // Update all text elements with translations
    Object.keys(translations[language]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = translations[language][key];
        }
    });
}

// Modal Sections
function toggleAbout() {
    const aboutSection = document.getElementById('aboutSection');
    if (aboutSection.style.display === 'none') {
        aboutSection.style.display = 'flex';
    } else {
        aboutSection.style.display = 'none';
    }
}

// Image Upload Handling
function handleImageUpload(event) {
    const file = event.target.files[0];
    const uploadBox = document.querySelector('.upload-box');
    const analyzeButton = document.getElementById('analyzeButton');

    if (file) {
        // Enable analyze button
        analyzeButton.disabled = false;

        // Update upload box text
        const uploadText = document.getElementById('uploadText');
        uploadText.textContent = file.name;

        // Optional: Show image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadBox.style.backgroundImage = `url(${e.target.result})`;
            uploadBox.style.backgroundSize = 'cover';
            uploadBox.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
}

// Analyze Image
async function analyzeImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const predictionDiv = document.getElementById('prediction');
    const confidenceDiv = document.getElementById('confidence');

    if (!file) {
        alert('Please select an image first');
        return;
    }

    // Show loading state
    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    predictionDiv.textContent = '';
    confidenceDiv.textContent = '';

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            // Update results
            predictionDiv.textContent = data.prediction;
            confidenceDiv.textContent = `${(data.confidence * 100).toFixed(2)}%`;
            
            // Show result
            resultDiv.style.display = 'block';
        } else {
            // Handle error
            alert(data.error || 'Error analyzing image');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing image. Please try again.');
    } finally {
        // Hide loading state
        loadingDiv.style.display = 'none';
    }
}

function toggleDiseases() {
    const diseasesSection = document.getElementById('diseasesSection');
    if (diseasesSection.style.display === 'none') {
        diseasesSection.style.display = 'flex';
    } else {
        diseasesSection.style.display = 'none';
    }
}

function toggleHowItWorks() {
    const howItWorksSection = document.getElementById('howItWorksSection');
    if (howItWorksSection.style.display === 'none') {
        howItWorksSection.style.display = 'flex';
    } else {
        howItWorksSection.style.display = 'none';
    }
}

function toggleContact() {
    const contactSection = document.getElementById('contactSection');
    if (contactSection.style.display === 'none') {
        contactSection.style.display = 'flex';
    } else {
        contactSection.style.display = 'none';
    }
}

// Update the document click event listener to handle all modals
document.addEventListener('click', (event) => {
    const modals = [
        'aboutSection',
        'diseasesSection',
        'howItWorksSection',
        'contactSection'
    ];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Add event listener for image upload
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', handleImageUpload);

    // Close about section when clicking outside
    document.addEventListener('click', (event) => {
        const aboutSection = document.getElementById('aboutSection');
        if (event.target === aboutSection) {
            aboutSection.style.display = 'none';
        }
    });
}); 