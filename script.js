// Comment hotkey: Ctrl+k+c and Ctrl+k+u to comment off

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
console.log(operationButtons)
console.log(allClearButton)

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        console.log(previousOperandTextElement)
        this.previousOperand = previousOperandTextElement.innerText
        this.currentOperand = currentOperandTextElement.innerText
        console.log(this.previousOperand)
        this.clear()
        console.log(this.operation)
    }
    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            this.operation = operation
            return
        }
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(curr) || isNaN(prev)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '÷':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // get the integer part of the number
        const decimalDigits = stringNumber.split('.')[1] // get the decimal part of the number
        let integerDisplay

        if (isNaN(integerDigits)) { //if integer is NaN
            integerDisplay = ''
        } else { //if integer is a number
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 }) //toLocaleString is essentially setting a string to a language, here 'english', and ensure 
            // that there can never be any decimal places after this value, when it gets convert to a string with a punch of commas
        }
        if (decimalDigits != null) { // if decimal number is not null
            return `${integerDisplay}.${decimalDigits}`
        } else { // if there is no decimal, then just return the integer number
            return integerDisplay
        }
    }

    updateDisplay() {
        console.log(this.currentOperand)
        currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            previousOperandTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})