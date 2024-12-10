var displayContainer = document.querySelector('.display');
var displayExpression = document.querySelector('.display .expression');
var displayResult = document.querySelector('.display .result');
var isResultHidden = function () { return displayResult.classList.contains('hidden'); };
var isResultShown = function () { return !isResultHidden(); };
var getResultValue = function () { return (displayResult.innerText === 'Math Error' ? '0' : displayResult.innerText); };
var isSymbol = function (button) { return /[\+\-\*\/]$/.test(button.innerHTML); };
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
                displayResult.innerHTML = eval(displayExpression.innerHTML); // Attention ici !
            }
            catch (_a) {
                displayResult.innerHTML = 'Math Error';
            }
            break;
        }
        default: {
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
    }
}
