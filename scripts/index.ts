var displayContainer = document.querySelector('.display') as HTMLElement;
var displayExpression = document.querySelector('.display .expression') as HTMLElement;
var displayResult = document.querySelector('.display .result') as HTMLElement;
const button = document.querySelector('.button-time') as HTMLElement;



var isResultHidden = (): boolean => displayResult.classList.contains('hidden');
var isResultShown = (): boolean => !isResultHidden();
var getResultValue = (): string => (displayResult.innerText === 'Math Error' ? '0' : displayResult.innerText);
var isSymbol = (button: HTMLElement): boolean => /[+\-*/]$/.test(button.innerHTML);
var isTimeVisible = false;

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
                
                displayResult.innerHTML = eval(displayExpression.innerHTML);
            } catch {
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

function handleDefaultButton(button: HTMLElement): void {
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



function calculateLog(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    if (value > 0) {
        displayResult.innerHTML = Math.log(value).toString(); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function calculatePower(): void {
    const parts = displayExpression.innerHTML.split('^'); 
    if (parts.length === 2) {
        const base = parseFloat(parts[0]); 
        const exponent = parseFloat(parts[1]); 
        displayResult.innerHTML = Math.pow(base, exponent).toString(); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function calculateFactorial(): void {
    const value = parseInt(displayExpression.innerHTML, 10); 
    if (value >= 0) {
        displayResult.innerHTML = factorial(value).toString(); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}


function factorial(n: number): number {
    return n === 0 || n === 1 ? 1 : n * factorial(n - 1); 
}


function calculateSquareRoot(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    if (value >= 0) {
        displayResult.innerHTML = Math.sqrt(value).toString(); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function calculateExponential(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    displayResult.innerHTML = Math.exp(value).toString();
}

function calculateCosine(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    const radians = value * (Math.PI / 180); 
    displayResult.innerHTML = Math.cos(radians).toString();
}

function calculateSine(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    const radians = value * (Math.PI / 180); 
    displayResult.innerHTML = Math.sin(radians).toString();
}

function calculateTangent(): void {
    const value = parseFloat(displayExpression.innerHTML); 
    const radians = value * (Math.PI / 180); 
    displayResult.innerHTML = Math.tan(radians).toString(); 
}

function calculateModulo(): void {
    const parts = displayExpression.innerHTML.split('%'); 
    if (parts.length === 2) {
        const dividend = parseFloat(parts[0]);
        const divisor = parseFloat(parts[1]); 

        if (divisor !== 0) {
            displayResult.innerHTML = (dividend % divisor).toString(); 
        } else {
            displayResult.innerHTML = 'Math Error'; 
        }
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function convertToBinary(): void {
    const value = parseInt(displayExpression.innerHTML, 10);

    if (!isNaN(value)) {
        displayResult.innerHTML = value.toString(2); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function convertToHexadecimal(): void {
    const value = parseInt(displayExpression.innerHTML, 10); 

    if (!isNaN(value)) {
        displayResult.innerHTML = value.toString(16).toUpperCase(); 
    } else {
        displayResult.innerHTML = 'Math Error';
    }
}

function convertToDecimal(): void {
    const binaryString = displayExpression.innerHTML; 

    if (/^[01]+$/.test(binaryString)) { 
        const decimalValue = parseInt(binaryString, 2); 
        displayResult.innerHTML = decimalValue.toString(); 
    } else {
        displayResult.innerHTML = 'Math Error'; 
    }
}

function toggleCurrentTime(): void {
    if (isTimeVisible) {
        displayResult.innerHTML = '';
    } else {
        const now = new Date();
        const hours: string = String(now.getHours()); 
        const minutes: string = String(now.getMinutes());
        const seconds: string = String(now.getSeconds());
        
        displayResult.innerHTML = `${hours}:${minutes}:${seconds}`; 
    }
    isTimeVisible = !isTimeVisible;
}


button.addEventListener('click', toggleCurrentTime);


