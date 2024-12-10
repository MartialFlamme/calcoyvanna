var displayContainer = document.querySelector('.display');
var displayExpression = document.querySelector('.display .expression');
var displayResult = document.querySelector('.display .result');
var button = document.querySelector('.button-time');
var isResultHidden = function () { return displayResult.classList.contains('hidden'); };
var isResultShown = function () { return !isResultHidden(); };
var getResultValue = function () { return (displayResult.innerText === 'Math Error' ? '0' : displayResult.innerText); };
var isSymbol = function (button) { return /[+\-*/]$/.test(button.innerHTML); };
var isTimeVisible = false;
document.querySelectorAll('.button').forEach(function (button) {
    button.addEventListener('click', function () { return handleButtonClick(button); });
});
function handleButtonClick(button) {
    switch (button.innerHTML) {
        case 'C': {
            displayExpression.innerHTML = '0';
            displayResult.classList.add('hidden');
            break;
        }
        case '=': {
            try {
                displayResult.classList.remove('hidden');
                // Use a safer evaluation method
                displayResult.innerHTML = eval(displayExpression.innerHTML);
            }
            catch (_a) {
                displayResult.innerHTML = 'Math Error';
            }
            break;
        }
        case 'log': {
            calculateLog();
            break;
        }
        case '^': {
            calculatePower();
            break;
        }
        case '!': {
            calculateFactorial();
            break;
        }
        case 'raci': {
            calculateSquareRoot();
            break;
        }
        case 'exp': {
            calculateExponential();
            break;
        }
        case 'cos': {
            calculateCosine();
            break;
        }
        case 'sin': {
            calculateSine();
            break;
        }
        case 'tan': {
            calculateTangent();
            break;
        }
        case 'mod': {
            calculateModulo();
            break;
        }
        case 'bin': {
            convertToBinary();
            break;
        }
        case 'hex': {
            convertToHexadecimal();
            break;
        }
        case 'dec': {
            convertToDecimal();
            break;
        }
        case 'TIME': {
            toggleCurrentTime();
            break;
        }
        default: {
            handleDefaultButton(button);
        }
    }
}
function handleDefaultButton(button) {
    if (isResultShown()) {
        displayExpression.innerHTML = isSymbol(button) ? getResultValue() : '0';
        displayResult.classList.add('hidden');
    }
    displayExpression.innerHTML =
        displayExpression.innerHTML === '0'
            ? button.innerHTML === '00'
                ? '0'
                : button.innerHTML
            : displayExpression.innerHTML + button.innerHTML;
}
// Additional Functions
function calculateLog() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    if (value > 0) {
        displayResult.innerHTML = Math.log(value).toString(); // Calcule le logarithme naturel
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les valeurs <= 0
    }
}
function calculatePower() {
    var parts = displayExpression.innerHTML.split('^'); // Sépare l'expression en utilisant le symbole ^
    if (parts.length === 2) {
        var base = parseFloat(parts[0]); // Base
        var exponent = parseFloat(parts[1]); // Exposant
        displayResult.innerHTML = Math.pow(base, exponent).toString(); // Calcule la puissance
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs si l'expression n'est pas valide
    }
}
function calculateFactorial() {
    var value = parseInt(displayExpression.innerHTML, 10); // Récupère la valeur à partir de l'expression
    if (value >= 0) {
        displayResult.innerHTML = factorial(value).toString(); // Calcule la factorielle
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les valeurs négatives
    }
}
// Fonction récursive pour calculer la factorielle
function factorial(n) {
    return n === 0 || n === 1 ? 1 : n * factorial(n - 1); // Cas de base
}
function calculateSquareRoot() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    if (value >= 0) {
        displayResult.innerHTML = Math.sqrt(value).toString(); // Calcule la racine carrée
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les valeurs négatives
    }
}
function calculateExponential() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    displayResult.innerHTML = Math.exp(value).toString(); // Calcule e^x
}
function calculateCosine() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    var radians = value * (Math.PI / 180); // Convertit les degrés en radians
    displayResult.innerHTML = Math.cos(radians).toString(); // Calcule le cosinus
}
function calculateSine() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    var radians = value * (Math.PI / 180); // Convertit les degrés en radians
    displayResult.innerHTML = Math.sin(radians).toString(); // Calcule le sinus
}
function calculateTangent() {
    var value = parseFloat(displayExpression.innerHTML); // Récupère la valeur à partir de l'expression
    var radians = value * (Math.PI / 180); // Convertit les degrés en radians
    displayResult.innerHTML = Math.tan(radians).toString(); // Calcule la tangente
}
function calculateModulo() {
    var parts = displayExpression.innerHTML.split('%'); // Sépare l'expression en utilisant le symbole %
    if (parts.length === 2) {
        var dividend = parseFloat(parts[0]); // Le premier nombre (dividende)
        var divisor = parseFloat(parts[1]); // Le second nombre (diviseur)
        if (divisor !== 0) {
            displayResult.innerHTML = (dividend % divisor).toString(); // Calcule le modulo
        }
        else {
            displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour la division par zéro
        }
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs si l'expression n'est pas valide
    }
}
function convertToBinary() {
    var value = parseInt(displayExpression.innerHTML, 10); // Récupère la valeur à partir de l'expression
    if (!isNaN(value)) {
        displayResult.innerHTML = value.toString(2); // Convertit en binaire
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les entrées non valides
    }
}
function convertToHexadecimal() {
    var value = parseInt(displayExpression.innerHTML, 10); // Récupère la valeur à partir de l'expression
    if (!isNaN(value)) {
        displayResult.innerHTML = value.toString(16).toUpperCase(); // Convertit en hexadécimal et met en majuscules
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les entrées non valides
    }
}
function convertToDecimal() {
    var binaryString = displayExpression.innerHTML; // Récupère la chaîne binaire à partir de l'expression
    if (/^[01]+$/.test(binaryString)) { // Vérifie si la chaîne ne contient que des 0 et des 1
        var decimalValue = parseInt(binaryString, 2); // Convertit en décimal
        displayResult.innerHTML = decimalValue.toString(); // Affiche le résultat
    }
    else {
        displayResult.innerHTML = 'Math Error'; // Gestion des erreurs pour les entrées non valides
    }
}
function toggleCurrentTime() {
    if (isTimeVisible) {
        displayResult.innerHTML = ''; // Masque l'heure
    }
    else {
        var now = new Date();
        var hours = String(now.getHours()); // Ajoute un zéro devant si nécessaire
        var minutes = String(now.getMinutes());
        var seconds = String(now.getSeconds());
        displayResult.innerHTML = "".concat(hours, ":").concat(minutes, ":").concat(seconds); // Affiche l'heure
    }
    isTimeVisible = !isTimeVisible; // Inverse l'état
}
// Ajout d'un gestionnaire d'événements au bouton
button.addEventListener('click', toggleCurrentTime);
