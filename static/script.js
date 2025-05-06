// Elements
const dragArea = document.getElementById('drag-area');
const fileInput = document.getElementById('file-input');
const chooseBtn = document.getElementById('choose-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const progressArea = document.getElementById('progress-area');
const resultArea = document.getElementById('result-area');
const fileNameDiv = document.getElementById('file-name');

let selectedFile = null;

// Add image preview element to the drag area
const previewImg = document.createElement('img');
previewImg.id = 'preview-img';
previewImg.style.maxWidth = '100%';
previewImg.style.maxHeight = '180px';
previewImg.style.display = 'none';
previewImg.style.margin = '0 auto 10px auto';
previewImg.style.borderRadius = '8px';
dragArea.insertBefore(previewImg, dragArea.firstChild);

// Drag & Drop Events
['dragenter', 'dragover'].forEach(eventName => {
    dragArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragArea.classList.add('dragover');
    });
});
['dragleave', 'drop'].forEach(eventName => {
    dragArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragArea.classList.remove('dragover');
    });
});
dragArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files[0]) {
        setFile(files[0]);
    }
});

// Choose File Button
chooseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
    }
});

function setFile(file) {
    selectedFile = file;
    fileNameDiv.textContent = file.name;
    resultArea.innerHTML = '';

    // Show image preview
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImg.style.display = 'none';
        previewImg.src = '';
    }
}

// Analyze Button
analyzeBtn.addEventListener('click', () => {
    if (!selectedFile) {
        resultArea.innerHTML = '<div class="text-danger">Please select an image file first.</div>';
        return;
    }
    // Prepare form data
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Show progress
    progressArea.style.display = 'block';
    resultArea.innerHTML = '';
    analyzeBtn.disabled = true;
    chooseBtn.disabled = true;

    // Send AJAX request
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        progressArea.style.display = 'none';
        analyzeBtn.disabled = false;
        chooseBtn.disabled = false;
        if (data.error) {
            resultArea.innerHTML = `<div class="text-danger">${data.error}</div>`;
        } else {
            resultArea.innerHTML = `
                <div class="alert alert-success">
                    <h4 class="mb-2">Prediction: <b>${data.prediction}</b></h4>
                    <div>Confidence: <b>${(data.confidence * 100).toFixed(2)}%</b></div>
                </div>
                <div class="mt-4">
                    <h6>Class Probabilities:</h6>
                    <ul class="list-group">
                        ${Object.entries(data.probabilities).map(([cls, prob]) =>
                            `<li class="list-group-item d-flex justify-content-between align-items-center">
                                ${cls}
                                <span class="badge badge-success badge-pill">${(prob * 100).toFixed(2)}%</span>
                            </li>`).join('')}
                    </ul>
                </div>
            `;
        }
    })
    .catch(err => {
        progressArea.style.display = 'none';
        analyzeBtn.disabled = false;
        chooseBtn.disabled = false;
        resultArea.innerHTML = `<div class="text-danger">Error: ${err}</div>`;
    });
}); 