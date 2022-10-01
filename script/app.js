const numberBtns = document.querySelectorAll(".btn-numbers")
const operatorBtns = document.querySelectorAll(".btn-operator")
const equalsBtn = document.querySelector(".btn-equals")
const currentElement = document.getElementById("current")
const previousElement = document.getElementById("previous")
const clearBtn = document.querySelector(".clear-btn")
const deleteBtn = document.querySelector(".delete-btn")

let currentDisplay = ""
let previousDisplay = ""
let lastOperator = ""
let haveEquals = false
let changed = false
let haveDot = false
let cantRemove = false


// --------Click Event Listener---------
// --------Number Buttons---------
numberBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const dataValue = e.currentTarget.dataset.value
        if(haveDot && dataValue == ".")return
        if(dataValue == "."){
            haveDot = true
        }
        cantRemove = false
        currentDisplay += dataValue
        currentElement.textContent = currentDisplay
    })
})
// --------Operator Buttons---------
operatorBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const operator = e.currentTarget.dataset.value
        haveDot = false

       
        if (!currentDisplay){
            currentDisplay = 0
        }
        
        if(haveEquals && !changed){
            previousElement.textContent = previousElement.textContent.slice(0,-2)
            changed = true
        }

        if(previousDisplay && currentDisplay == "."){
            currentDisplay = 0
            currentElement.textContent = "0"
        }

        if(currentDisplay && previousDisplay){
            let result = operate(lastOperator,parseFloat(previousDisplay),parseFloat(currentDisplay))
            previousDisplay = result
            previousElement.textContent = `${previousDisplay} ${operator}`
            currentDisplay = ""
            currentElement.textContent = result
            lastOperator = operator
            cantRemove = true
            return
        }
        lastOperator = operator
        if(previousDisplay && !currentDisplay){
            previousElement.textContent = `${previousElement.textContent.slice(0,-1)} ${operator}`
            currentDisplay = ""
            return
        }

        // Else
        previousDisplay = currentDisplay
        previousElement.textContent = `${previousDisplay} ${operator}`
        currentDisplay = ""
        
    })
})
// --------Equal Button---------
equalsBtn.addEventListener("click",()=>{
    if(!currentDisplay || !previousDisplay)return
    if(previousDisplay && currentDisplay == "."){
        currentDisplay = 0
    }
    let result = operate(lastOperator,parseFloat(previousDisplay),parseFloat(currentDisplay))
    previousElement.textContent = `${previousDisplay} ${lastOperator} ${currentDisplay} = `
    currentElement.textContent = result
    previousDisplay = result
    currentDisplay = ""
    haveEquals = true
    haveDot = false
    changed = false
    cantRemove = true
})

// --------Clear button---------
clearBtn.addEventListener("click",()=>{
    currentDisplay = ""
    previousDisplay = ""
    lastOperator = ""
    haveEquals = false
    changed = false
    haveDot = false
    cantRemove = false
    currentElement.textContent = "0"
    previousElement.textContent = "0"
})

// --------Remove button---------
deleteBtn.addEventListener("click",()=>{
    if(cantRemove)return
    currentDisplay = currentDisplay.slice(0,-1)
    currentElement.textContent = currentElement.textContent.slice(0,-1)
})

// --------Functions---------
function add(previous,current){
    return previous + current
}

function substract(previous,current){
    return previous - current
}

function multiply(previous,current){
    return previous * current
}

function divide(previous,current){
    return previous / current
}

function operate(operator,previous,current){
    let result = 0
    switch(operator){
        case "+":
            result = add(previous,current)
            break
        case "-":
            result = substract(previous,current)
            break
        case "*":
            result = multiply(previous,current)
            break
        case "/":
            result = divide(previous,current)
            break
    }

    return result
}