function operate(a, b, operator) {
    let sum = 0;
    num1 = Number(a);
    num2 = Number(b);
    switch (operator){
        case "+": 
            sum = num1 + num2;
            console.log(num1,num2,typeof num1, sum)
            screen.textContent = sum;
            break;
        
        case "-": 
            sum = num1 - num2;
            screen.textContent = sum;
            break;
        
        case "*": 
            sum = num1 * num2;
            screen.textContent = sum;
            break;

        case "/": 
            sum = num1 / num2;
            screen.textContent = sum;
            break;
    }
    return sum;
}

const screen = document.querySelector(".screen");
const keypad = document.querySelector(".keypad");
screen.textContent = "0"
let firstNumber = '';
let secondNumber = '';
let operatorChosen = '';


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
                screen.textContent = firstNumber;}
            } else { 
                firstNumber = firstNumber + event.target.value;
                screen.textContent = firstNumber;
            }
        } else {
            if (event.target.value === "."){
                if (!secondNumber.includes(".")){ 
                secondNumber = secondNumber + event.target.value;
                screen.textContent = secondNumber;}
            } else { 
                secondNumber = secondNumber + event.target.value;
                screen.textContent = secondNumber;
            }
        }
    }

    if (event.target.className === "operatorBtns") {
        if (firstNumber === '') {
            firstNumber = 0;
            operatorChosen = event.target.value;
        }
        if (secondNumber.length > 0 && operatorChosen.length > 0){
            firstNumber = operate(firstNumber, secondNumber, operatorChosen);
            secondNumber = '';
            operatorChosen = event.target.value;
        } else {
            operatorChosen = event.target.value;
        }
        
    }
    
    if (event.target.className === "equalsButton") {
        
    }
  })