// infix to postfix
function InfixConverter(rules) {
    const expressionValidationRegex = /^([0-9]|\+|-|\(|\)|\*|\/|d)/;
    var operator, token = "A".charCodeAt(0);
    const tokens = {};
    const operatorsStack = []; 
    const result = [];
    const operators = {};
    
    function tokenize(expression){
        return expression.replace(/[0-9]+/g, (str) => {
            const nextToken = String.fromCharCode(token++);
            tokens[nextToken] = str;
            return nextToken;
        });        
    }
    function peek() { return operatorsStack[operatorsStack.length - 1]; }    
    function prepExpression(expression) {
        if (typeof expression !== "string" ||  !expressionValidationRegex.test(expression)) { 
            throw new RangeError("Invalid expression."); 
        }
        result.length = operatorsStack.length = 0;
        return tokenize(expression);      
    }
    const methods = {
        rightToLeft() { operatorsStack.push(operator); },
        openBrace() { operatorsStack.push(operator); }, // this is same as above 
        leftToRight() {
            result.push(operatorsStack.pop().char);
            operatorsStack.push(operator);            
        },
        closeBrace() {
            while (peek(operatorsStack).char !== "(") { result.push(operatorsStack.pop().char); }
            operatorsStack.pop();
        }
    };
    rules.forEach(operator => {
        operators[operator.char] = operator;
        operator.move = methods[operator.move];
        operator.process = methods[operator.process];
    })
    this.toPostfix = function(expression) {
        expression = prepExpression(expression); 
        for (var i = 0; i < expression.length; i++) {
            operator = operators[expression[i]];
            if (!operator) {  
                result.push(expression[i]);
            }else{
                const precedentOperator = peek(operatorsStack);
                if (!precedentOperator) { 
                    operatorsStack.push(operator);
                } else if (operator.process) { 
                    operator.process();
                } else if (precedentOperator.process) {  /* COULD BE A PROBLEM */
                    precedentOperator.process();
                } else if (operator.priority === precedentOperator.priority) { 
                    if(operator.move) { operator.move(); }
                } else if (operator.priority > precedentOperator.priority) { 
                    operatorsStack.push(operator);
                } else if (operator.priority < precedentOperator.priority) {
                    while (operatorsStack.length !== 0 && peek(operatorsStack).priority > operator.priority) {
                        result.push(operatorsStack.pop().char); 
                    }
                    operatorsStack.push(operator);
                }
            }
        }
        while (operatorsStack.length !== 0) { result.push(operatorsStack.pop().char); }
        for (const token of Object.keys(tokens)) { result[result.indexOf(token)] = tokens[token]; }
        return result;
    };
}
const rules = [];
function addRule(char, priority, move, process) { rules.push({char, priority, move, process}); }
addRule("+", 1, "leftToRight");
addRule("-", 1, "leftToRight");
addRule("*", 2, "leftToRight");
addRule("/", 2, "leftToRight");
addRule("d", 3, "leftToRight");
addRule("(", 0, "", "openBrace");
addRule(")", 0, "", "closeBrace");

const foo = new InfixConverter(rules);

const data = foo.toPostfix("(3 * 4 / (2 + 5)) * (3 + 4)").join("")

let str = ""
for(let i=0;i<data.length;i++){
  if(data[i]===" "){
      // break 
  }else{
    str+=data[i]
  }
}

console.log(str)
