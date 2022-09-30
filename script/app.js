const numberBtns = document.querySelectorAll(".btn-numbers")
const operatorBtns = document.querySelectorAll(".btn-operator")
const equalsBtn = document.querySelector(".btn-equals")
const previous = document.getElementById("previous")
const current = document.getElementById("current")
const clearBtn = document.querySelector(".clear-btn")
const deleteBtn = document.querySelector(".delete-btn")

// ------Variables-------
let previousValue = ""
// let currentValue = ""
let currentValue = ""
let previousString = ""
let operator = ""
let haveDot = false




// ------Events Listener------

// number buttons
numberBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        appendNumber(e.currentTarget.dataset.value)
    })
})


// operator buttons
operatorBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        if(currentValue != "" && previousValue !=""){
            let result = operate(operator,parseFloat(previousValue),parseFloat(currentValue))
            operator = e.currentTarget.dataset.value
            previousValue = result
            previousString = ""
            displayPrevious(operator,previousValue)
            current.textContent = result
            currentValue = ""
            return
        }
        operator = e.currentTarget.dataset.value
        if(previousString != ""){
            displayPrevious(operator,previousValue)
            return
        }
       
        if(!currentValue)return
        previousValue = currentValue
        currentValue = ""
        haveDot = false
        displayPrevious(operator,previousValue)
       
        
    })
})

// equals button
equalsBtn.addEventListener("click",result)

// clear button
clearBtn.addEventListener("click",clear)
// delete button

deleteBtn.addEventListener('click',remove)

function clear(){
    previousValue = ""
    previousString = ""
    currentValue = ""
    haveDot = false
    previous.textContent = 0
    current.textContent = 0
}

function remove(){
    
}

function result(){
    if(!currentValue || !previousValue)return
    let result = operate(operator,parseFloat(previousValue),parseFloat(currentValue))
    previousString += `${previousValue} = `
    previous.textContent = previousString
    previousValue = result
    currentValue = ""
    current.textContent = result
}

function displayPrevious(operator,previousValue){
    if(previousString != ""){
        previousString = previousString.slice(0,-2)
        previousString = `${previousString}${operator} `
        previous.textContent = previousString
        console.log("previous",previousValue)
        console.log("current",currentValue)
        return
    }
    previousString += `${previousValue} ${operator} `
    previous.textContent = previousString
}

function appendNumber(dataValue){

    if(dataValue == "." && haveDot){
        return
    }else if(dataValue =="." && haveDot == false){
        haveDot = true
    }

    let value = dataValue
    currentValue += value
    current.textContent = currentValue


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





