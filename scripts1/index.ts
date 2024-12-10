var displayContainer = document.querySelector('.display') as HTMLElement;
var displayExpression = document.querySelector('.display .expression') as HTMLElement;
var displayResult = document.querySelector('.display .result') as HTMLElement;

var isResultHidden = (): boolean => displayResult.classList.contains('hidden');
var isResultShown = (): boolean => !isResultHidden();
var getResultValue = (): string => (displayResult.innerText === 'Math Error' ? '0' : displayResult.innerText);

var isSymbol = (button: HTMLElement): boolean => /[\+\-\*\/]$/.test(button.innerHTML);

document.querySelectorAll('.button').forEach((button) => {
    (button as HTMLElement).addEventListener('click', () => handleButtonClick(button as HTMLElement));
});

function handleButtonClick(button: HTMLElement): void {
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
            } catch {
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
