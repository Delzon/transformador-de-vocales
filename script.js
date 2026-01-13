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
    ignoredWords: ["en", "la", "un", "el", "de", "que", "y", "a", "los", "las", "con", "por", "su", "the", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"]
};

// Mapa de vocales con caracteres especiales
const vowelMap = { 
    'a': 'ā', 'e': 'ē', 'i': 'ī', 'o': 'ō', 'u': 'ū', 
    'A': 'Ā', 'E': 'Ē', 'I': 'Ī', 'O': 'Ō', 'U': 'Ū' 
};

// Función de transformación de vocales
function transformVowels(text) {
    const ignoredWords = config.ignoredWords;
    const words = text.split(/(\s+)/);

    const transformed = words.map(word => {
        if (word.trim() === "" || ignoredWords.includes(word.toLowerCase())) {
            return word;
        }

        let transformed = false;
        return word.split('').map(letter => {
            if (!transformed && "aeiouAEIOU".includes(letter)) {
                transformed = true;
                return vowelMap[letter] || letter;
            }
            return letter;
        }).join('');
    }).join('');

    return transformed;
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
document.addEventListener('DOMContentLoaded', function() {
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
        const transformed = transformVowels(text);
        document.getElementById('outputText').textContent = transformed;
        updateStats(text);
    });
});
