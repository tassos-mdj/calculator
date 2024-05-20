//mouse operated only

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
                if (!firstNumber.includes(".")){ 
                firstNumber = firstNumber + event.target.value;
                screenUpdate(firstNumber);}
            } else { 
                firstNumber = firstNumber + event.target.value;
                screenUpdate(firstNumber);
            }
        } else {
            if (event.target.value === "."){
                if (!secondNumber.includes(".")){ 
                secondNumber = secondNumber + event.target.value;
                screenUpdate(secondNumber);}
            } else { 
                secondNumber = secondNumber + event.target.value;
                screenUpdate(secondNumber);
            }
        }
    }

    if (event.target.className === "operatorBtns") {
        if (firstNumber === '') {
            if (screen.textContent !== '0') {
                firstNumber = screen.textContent;
                operatorChosen = event.target.value;
            } else {
                firstNumber = '0';
                operatorChosen = event.target.value;
            }

        }
        if (secondNumber.length > 0 && operatorChosen.length > 0){
            firstNumber = operate(firstNumber, secondNumber, operatorChosen);
            secondNumber = '';
            operatorChosen = event.target.value;
        } else {
            operatorChosen = event.target.value;
        }
        
    }
    
    if (event.target.id === "equalsButton") {
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

  })

  

function screenUpdate(content) {
    if (content.length > 8){
        screen.textContent = content.slice(-8);
    } else{
    screen.textContent = content;
}
    
}

function cleanState() {
    firstNumber = '';
    secondNumber = '';
    operatorChosen = '';
}