const screenNumber = document.querySelector("#screen > h1")
const screenAnswer = document.querySelector("#screen > h2")


const allNumbers = document.querySelectorAll(".numbers")
const allFunctions = document.querySelectorAll(".function")

let answerList = []
let numList = []

function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    return x/y;
}
function modulo(x,y){
    return x%y;
}

function operate(operator, x, y){
    if(operator == "+"){return add(x,y)}
    if(operator == "-"){return subtract(x,y)}
    if(operator == "*"){return multiply(x,y)}
    if(operator == "/"){return divide(x,y)}
    if(operator == "%"){return modulo(x,y)}
}



function analizeOperation (list){
    function isValid(list, index){ // Given a operation list and an index, checks out if the operation is valid. The list has to be simplified with simplifyList before operation
        if(list[index-1] == undefined || list[index+1] == undefined || isNaN(list[index-1]) || isNaN(list[index+1])){
            return false; 
        } else {
            return true;
        }
    }
    function simplifyList(list){ //This takes the list and groups the numbers
        let newList = []
        list.forEach((elem) => {
            if(isNaN(elem)){
                newList.push(elem)
            } else{
                if(isNaN(newList[newList.length-1])){
                    newList.push(elem)
                } else {
                    newList[newList.length-1] = parseInt(newList[newList.length-1].toString()+`${elem}`)
                } 
            }
        });
        console.log("Simplified list =", newList)
        return newList
    }
    list = simplifyList(list);
    // Now i have to iterate through all the list
    function findOperation(list, func){ //This returns a new list with the operation completed or in case there's not any operation with that func, returns false
        let funcIndex = list.findIndex((elem) => {return elem == func}) 
        let restList = list.slice(funcIndex + 2)
        let beforeList = []
        if (funcIndex > 2){
            beforeList = list.slice(0,funcIndex-1)
        } 
        if(funcIndex > 0 && isValid(list, funcIndex)){
            let rta =[...beforeList, operate(list[funcIndex],list[funcIndex-1],list[funcIndex+1]), ...restList ]
            return rta
        } else {
            return false
        }
    }
    let funcList = ["/","*","-","+"];
    for(let func in funcList){
        console.log(funcList[func])
        while(findOperation(list,funcList[func]) != false){
            list = findOperation(list, funcList[func])
            console.log("list: " + list)
        }
    }
    if((list.length > 1) || (list[0] in funcList)){
        return "error"
    }
    console.log("final list: ", list)
    return list;
}

allNumbers.forEach((num)=>{
    num.addEventListener("click", (e)=>{
        numList.push(e.target.textContent)
        screenNumber.textContent= numList.join("")
    })
})
allFunctions.forEach((num)=>{
    num.addEventListener("click", (e)=>{
        numList.push(e.target.textContent)
        screenNumber.textContent= numList.join("")
    })
})

document.querySelector("#back").addEventListener("click", () => {
    numList.pop();
    screenNumber.textContent= numList.join("")
    if(numList.length == 0){
        screenNumber.textContent = ". . ."
    }
})
document.querySelector("#clear").addEventListener("click", () => {
    console.log("back")
    numList= [];
    screenNumber.textContent= ". . ."
})

document.querySelector("#equal").addEventListener("click", ()=>{
    screenAnswer.textContent = analizeOperation(numList);
    newAnswerList(screenAnswer.textContent);
})

//Keyboard compatibility

document.addEventListener("keydown", (event) => {
    let funcList = ["+","-","*","/","Enter","Backspace"];
    if(Number.isInteger(parseInt(event.key))) {
        numList.push(parseInt(event.key));
        screenNumber.textContent= numList.join("");
    } else if (funcList.includes(event.key.toString()) && event.key != "Enter" && event.key != "Backspace"){
        numList.push(event.key);
        screenNumber.textContent= numList.join("");
    } else if(event.key == "Enter"){
        screenAnswer.textContent = analizeOperation(numList)
        newAnswerList(screenAnswer.textContent);
    } else if(event.key == "Backspace"){
        numList.pop();
        screenNumber.textContent= numList.join("")
        if(numList.length == 0){
            screenNumber.textContent = ". . ."
        }
    }
})


function newAnswerList(num){
    let li = 1;
    answerList.push(num);
    console.log(answerList.length)
    for(let i = answerList.length-1; (i >= answerList.length-5)  && (i >= 0); i--){
        document.querySelector(`#li-${li}`).textContent = answerList[i];
        li++;
    }
}

document.querySelector("#memory-button").addEventListener("click", ()=>{
    document.querySelector(".memory-card").classList.toggle("invisible")
})

document.querySelector("#color-button").addEventListener("click", ()=>{
    alert("Color theme changer. Will add it in the future")
})
document.querySelector("#readme-button").addEventListener("click", ()=>{
    alert("README.md reader. Will add it in the future")
})