// Configuración en inglés
const config = {
    title: "🔄 Vowel Transformer",
    inputLabel: "Input text:",
    outputLabel: "Transformed text:",
    placeholder: "Type or paste your text here...",
    resultPlaceholder: "The result will appear here...",
    copyButton: "📋 Copy",
    copiedButton: "✅ Copied",
    charactersLabel: "Characters",
    vowelsLabel: "Vowels",
    substitutionProbability: 0.7
};

// Mapa de variantes de vocales con caracteres homoglíficos
const vowelVariants = {
    'a': ['ā', 'ă', 'â', 'ã', 'ä', 'å'],
    'e': ['ē', 'ĕ', 'ê', 'ẽ', 'ë', 'ė'],
    'i': ['ī', 'ĭ', 'î', 'ĩ', 'ï', 'í'],
    'o': ['ō', 'ŏ', 'ô', 'õ', 'ö', 'ȯ'],
    'u': ['ū', 'ŭ', 'û', 'ũ', 'ü', 'ů'],
    'A': ['Ā', 'Ă', 'Â', 'Ã', 'Ä', 'Å'],
    'E': ['Ē', 'Ĕ', 'Ê', 'Ẽ', 'Ë', 'Ė'],
    'I': ['Ī', 'Ĭ', 'Î', 'Ĩ', 'Ï', 'Í'],
    'O': ['Ō', 'Ŏ', 'Ô', 'Õ', 'Ö', 'Ȯ'],
    'U': ['Ū', 'Ŭ', 'Û', 'Ũ', 'Ü', 'Ů']
};

// Devuelve un elemento aleatorio de un array
function getRandomVariant(variants) {
    const index = Math.floor(Math.random() * variants.length);
    return variants[index];
}

// Determina si una vocal debe ser sustituida según la probabilidad configurada
function shouldSubstitute() {
    return Math.random() < config.substitutionProbability;
}

// Función principal de transformación de vocales (per-character)
function transformText(text) {
    // Normalizar a NFC para manejar caracteres Unicode pre-combinados
    const normalized = text.normalize('NFC');

    return normalized.split('').map(char => {
        const variants = vowelVariants[char];
        if (variants && shouldSubstitute()) {
            return getRandomVariant(variants);
        }
        return char;
    }).join('');
}

// Función llamada por el botón Transform (mantiene compatibilidad)
function transform() {
    const inputText = document.getElementById('inputText').value;
    const transformed = transformText(inputText);
    document.getElementById('outputText').textContent = transformed;
    updateStats(inputText);
}

// Función para re-ejecutar la transformación (re-roll)
function retransform() {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        const transformed = transformText(inputText);
        document.getElementById('outputText').textContent = transformed;
    }
}

// Función para actualizar las estadísticas
function updateStats(text) {
    document.getElementById('charCount').textContent = text.length;
    const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
    document.getElementById('vowelCount').textContent = vowelCount;
}

// Función para copiar al portapapeles
function copyToClipboard() {
    const outputText = document.getElementById('outputText').textContent;
    const copyButton = document.querySelector('.copy-button');

    if (outputText && outputText !== config.resultPlaceholder) {
        navigator.clipboard.writeText(outputText).then(() => {
            copyButton.textContent = config.copiedButton;
            copyButton.classList.add('copied');

            setTimeout(() => {
                copyButton.textContent = config.copyButton;
                copyButton.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = outputText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            copyButton.textContent = config.copiedButton;
            copyButton.classList.add('copied');

            setTimeout(() => {
                copyButton.textContent = config.copyButton;
                copyButton.classList.remove('copied');
            }, 2000);
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    // Configurar textos en inglés
    document.title = config.title.replace(/🔄\s*/, '');
    document.querySelector('h1').textContent = config.title;
    document.querySelector('label[for="inputText"]').textContent = config.inputLabel;
    document.querySelector('label[for="outputText"]').textContent = config.outputLabel;
    document.getElementById('inputText').placeholder = config.placeholder;
    document.getElementById('outputText').textContent = config.resultPlaceholder;
    document.querySelector('.copy-button').textContent = config.copyButton;
    document.getElementById('charCount').nextElementSibling.textContent = config.charactersLabel;
    document.getElementById('vowelCount').nextElementSibling.textContent = config.vowelsLabel;

    // Event listener para el input
    document.getElementById('inputText').addEventListener('input', (e) => {
        const text = e.target.value;
        const transformed = transformText(text);
        document.getElementById('outputText').textContent = transformed;
        updateStats(text);
    });
});
