// Аккордеон
document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});

// Калькулятор BPM → MS
document.getElementById('calculate').addEventListener('click', () => {
    const bpm = parseFloat(document.getElementById('bpm').value);
    if (!bpm) return;

    const quarterNote = 60000 / bpm;
    const eighthNote = quarterNote / 2;

    document.getElementById('result').innerHTML = `
        <p>1/4 Note: ${quarterNote.toFixed(2)} ms</p>
        <p>1/8 Note: ${eighthNote.toFixed(2)} ms</p>
    `;
});
