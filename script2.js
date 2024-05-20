// with mouse & keyboard funcionality

//performs the calculation
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

//initialization and section selectors
const operatorDisplay = document.querySelector(".operatorDisplay")
const screen = document.querySelector(".numbersDisplay");
const keypad = document.querySelector(".keypad");
screen.textContent = "0"
firstNumber = '';
secondNumber = '';
operatorChosen = '';

//mouse actions listener
keypad.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }

// number and dot selection handling
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

//other buttons handling
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

//physical keyboard buttons listener
window.addEventListener('keydown', function (e) {
    const numbers  = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const operators = ['+', '-', '*', '/']
    
    //numbers and dot handling
    if (numbers.includes(e.key)){
        if (operatorChosen === '') {
            if (e.key === "."){
                addPoint(1);
            } else { 
                updateFirstNumber(e.key);
            }
        } else {
            if (e.key === "."){
                addPoint(2);
            } else { 
                updateSecondNumber(e.key);
            }
        }
    }

//other keys handling    
if (operators.includes(e.key)) {
        updateOperator(e.key);
    }

    if (e.key === "Enter") {
        equals();
    }
});

//add dot once function
function addPoint(selector){
    switch (selector) {
        case 1:
            if (!firstNumber.includes(".")){ 
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

//update variables functions
function updateFirstNumber(newValue) {
    firstNumber = firstNumber + '' + newValue;
    screenUpdate(firstNumber);
}

function updateSecondNumber(newValue) {
    secondNumber = secondNumber + newValue;
    screenUpdate(secondNumber);
}

//update operator and perform chain operations
function updateOperator(newValue) {
    if (firstNumber === '') {
        if (screen.textContent !== '0') {
            firstNumber = screen.textContent;
            operatorChosen = newValue;
            operatorDisplay.textContent = operatorChosen;
        } else {
            firstNumber = '0';
            operatorChosen = newValue;
            operatorDisplay.textContent = operatorChosen;
        }

    }
    if (secondNumber.length > 0 && operatorChosen.length > 0){
        firstNumber = operate(firstNumber, secondNumber, operatorChosen);
        secondNumber = '';
        operatorChosen = newValue;
        operatorDisplay.textContent = operatorChosen;
    } else {
        operatorChosen = newValue;
        operatorDisplay.textContent = operatorChosen;
    }
}

//perform operation
function equals() {
    if (secondNumber === '0') {
        screenUpdate('Error');
        cleanState();
    } else {
    sum = operate(firstNumber, secondNumber, operatorChosen);
    firstNumber = '';
    secondNumber = '';
    operatorChosen = '';
    screenUpdate(sum);} 
}

//display update function
function screenUpdate(content) {
    if (content.length > 8){
        screen.textContent = content.slice(-8);
    } else{
    screen.textContent = content;
    }
    operatorDisplay.textContent = operatorChosen;

}

//reset all variales function
function cleanState() {
    firstNumber = '';
    secondNumber = '';
    operatorChosen = '';
}