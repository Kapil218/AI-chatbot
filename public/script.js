document.addEventListener('DOMContentLoaded', function () {
    const promptInput = document.getElementById('promptInput');
    const generateButton = document.getElementById('generateButton');
    const stopButton = document.getElementById('stopButton');
    const results = document.getElementById('results');

    let isGenerating = false;

    generateButton.addEventListener('click', function () {
        if (isGenerating) return;
        isGenerating = true;
        results.textContent = 'Generating...';
        const prompt = promptInput.value;
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        })
        .then(response => response.json())
        .then(data => {
            if (isGenerating) {
                results.textContent = data.result;
                isGenerating = false;
            }
        })
        .catch(error => {
            results.textContent = 'Error: ' + error.message;
            isGenerating = false;
        });
    });

    stopButton.addEventListener('click', function () {
        isGenerating = false;
        results.textContent = 'Generation stopped.';
    });
});
