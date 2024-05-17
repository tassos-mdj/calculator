function operate(a, b, operator) {
    let sum = 0;
    num1 = Number(a);
    num2 = Number(b);
    switch (operator){
        case "+": 
            sum = num1 + num2;
            break;
        
        case "-": 
            sum = num1 - num2;
            break;
        
        case "*": 
            sum = num1 * num2;
            break;

        case "/": 
            if (num2 === 0) {screenUpdate('Error');} else {
            sum = num1 / num2;}
            break;
    }
    let rounded = Math.round(sum * 100) / 100;
    screenUpdate(rounded);
    return rounded;
}

const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keypad");
screen.textContent = "0"
firstNumber = '';
secondNumber = '';
operatorChosen = '';

keypad.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }

    if (event.target.className === "numberBtns"){
        if (operatorChosen === '') {
            if (event.target.value === "."){
                addPoint(1);
            } else { 
                updateFirstNumber(event.target.value);
            }
        } else {
            if (event.target.value === "."){
                addPoint(2);
            } else { 
                updateSecondNumber(event.target.value);
            }
        }
    }

    if (event.target.className === "operatorBtns") {
        updateOperator(event.target.value);
    }

    if (event.target.id === "equalsButton") {
        equals();
    }

    if (event.target.id === "clearButton") {
        cleanState();
        screenUpdate('0');
    }

    if (event.target.id === "prefixButton") {
        if (firstNumber.length > 0){
            if (screen.textContent === firstNumber) {
                firstNumber = '-' + firstNumber;
                screenUpdate(firstNumber);
            } else {
                if (screen.textContent === secondNumber) {
                    secondNumber = '-' + secondNumber;
                    screenUpdate(secondNumber);
                }
            }
        }
    }

    if (event.target.id === "percentButton") {
        if (operatorChosen === '*') {
            secondNumber /= 100;
            screenUpdate (secondNumber);
        }
    }

});

//keypad.addEventListener('keydown', function (event) {})

function addPoint(selector){
    switch (selector) {
        case 1:
            if (!firstNumber.includes(".")){ 
            console.log(typeof firstNumber);
            updateFirstNumber(".");
            }
            break;
        case 2:        
            if (!secondNumber.includes(".")){ 
            updateSecondNumber(".");
            }
            break;             
}
}

function updateFirstNumber(newValue) {
    firstNumber = firstNumber + '' + newValue;
    screenUpdate(firstNumber);
}

function updateSecondNumber(newValue) {
    secondNumber = secondNumber + newValue;
    screenUpdate(secondNumber);
}

function updateOperator(newValue) {
    if (firstNumber === '') {
        if (screen.textContent !== '0') {
            firstNumber = screen.textContent;
            operatorChosen = newValue;
        } else {
            firstNumber = '0';
            operatorChosen = newValue;
        }

    }
    if (secondNumber.length > 0 && operatorChosen.length > 0){
        firstNumber = operate(firstNumber, secondNumber, operatorChosen);
        secondNumber = '';
        operatorChosen = newValue;
    } else {
        operatorChosen = newValue;
    }
}

function equals() {
    if (secondNumber === '0') {
        screenUpdate('Error');
        cleanState();
    } else {
    sum = operate(firstNumber, secondNumber, operatorChosen);
    screenUpdate(sum);
    firstNumber = '';
    secondNumber = '';
    operatorChosen = '';} 
}

function screenUpdate(content) {
    if (content.length > 8){
        screen.textContent = content.slice(-8);
    } else{
    screen.textContent = content;
    console.log(content);
    }
}

function cleanState() {
    firstNumber = '';
    secondNumber = '';
    operatorChosen = '';
}