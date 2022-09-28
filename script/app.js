const resultEle = document.getElementById("result")
const btns = document.querySelectorAll(".btn")
const clearBtn = document.querySelector(".clear-btn")
const deleteBtn = document.querySelector(".delete-btn")
let firstNumber = 0
let secondNumber = 0
let lastValue = 0
let operator
let turn = "firstNumber"
let oneTime = 0
btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const dataValue = e.currentTarget.dataset.value
        

        // check if the user input decimal point more than one
        if(dataValue == "."){
            if(oneTime == 1){
                return
            }else{
                oneTime++
            }
        }

        // check if the user click equals button
        if(dataValue == "="){
          equals()
          return
        }


        // check if the user click operator button
        if(dataValue == "/" || dataValue == "*" || dataValue == "-" || dataValue == "+"){
            
            oneTime = 0
            
            if(secondNumber !=0){
                equals()
                operator = dataValue
                return
            }
            operator = dataValue
            if(turn == "firstNumber"){
                turn = "secondNumber"
            }
            return  
        } 



        // set the first number and second number and input them in the textbox
        if(turn == "firstNumber"){
            firstNumber += dataValue
            resultEle.textContent = firstNumber.slice(1)
        }else{
            secondNumber += dataValue
            resultEle.textContent = secondNumber.slice(1)
        }
            
        
    })
})

// -----CLEAR BUTTON--------
clearBtn.addEventListener("click",()=>{
    firstNumber = 0
    secondNumber = 0
    lastValue = 0
    operator = 0
    turn = "firstNumber"
    resultEle.textContent = 0
})
// --------DELETE BUTTON------
deleteBtn.addEventListener("click",()=>{
    resultEle.textContent = resultEle.textContent.slice(0,-1)
    if(resultEle.textContent == ""){
        resultEle.textContent = 0
    }


    if(turn == "firstNumber"){
        // if(firstNumber == 0 ){
        //     resultEle.textContent = 0
        // }
        firstNumber = resultEle.textContent
    }else{
        // if(secondNumber ==0){
        //     resultEle.textContent = 0
        // }
        secondNumber = resultEle.textContent
    }

    console.log(firstNumber)
    console.log(secondNumber)
})


function equals(){
    lastValue =  operate(operator,parseFloat(firstNumber),parseFloat(secondNumber))

    if(lastValue % 1 != 0){
     resultEle.textContent = lastValue.toFixed(2)
    }else{
     resultEle.textContent = lastValue
    }

    
    firstNumber = lastValue
    secondNumber = 0
    operator = ""
    turn = "secondNumber"
    return
}
function add(num1,num2){
    return num1 + num2
}


function substract(num1,num2){
    return num1 - num2
}

function multiply(num1,num2){
    return num1 * num2
}

function divide(num1,num2){
    return num1/num2
}

function operate(operator,num1,num2){
    let result
    switch(operator){
        case "+":
            result = add(num1,num2)
            break
        case "-":
            result = substract(num1,num2)
            break
        case "*":
            result = multiply(num1,num2)
            break
        case "/":
            result = divide(num1,num2)
            break
    }
    return result
}

