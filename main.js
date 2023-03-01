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

function operate(operator, x, y){
    if(operator == "+"){add(x,y)}
    if(operator == "-"){subtract(x,y)}
    if(operator == "*"){multiply(x,y)}
    if(operator == "/"){divide(x,y)}
}