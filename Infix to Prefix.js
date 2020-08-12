
// Infix to Prefix Conversion
// Stack class to define a stack
class Stack {
    constructor(length) {
        this.stack = Array(length);
        this.top = -1;
        this.length = length;
    }
    
    // Pushing element inside stack
    push(val) {
        if (this.top == this.length - 1)
            return -999;
        this.stack[++this.top] = val;
        return 1;
    }
    
    // Pop element from stack
    pop() {
        if (this.top == -1)
            return -999;
        return this.stack[this.top--];
    }
}

// Check if character in string is
// an opertor or any alphabet or digit
function isOperator(ch) {
    var x = ch.match("^[A-Za-z0-9]+$")===null;
    return x;
}

// Checking operator precedence
function priority(ch) {
    if(ch === '+' || ch === '-')
        return 1;
    if (ch === '*' || ch === '/')
        return 2;
    if (ch === '^')
        return 3;
    return 0;
        
}

function infixToPrefix(infix) {
    var prefix = "";
    var revInfix = "";
    
    // Replacing '(' with ')' and
    // reversing the input string
    for (var i = infix.length - 1; i >= 0; i--) {
        var ch = infix.charAt(i);
        if (ch === '(')
            ch = ')';
        else if (ch === ')')
            ch = '(';
        revInfix += ch;
    }
    infix = revInfix;
    
    // Declaration of stack
    stack = new Stack(infix.length);
    for (var j = 0; j < infix.length; j++) {
        var i = infix.charAt(j);
        
        // If character is '(' push it to stack
        if (i == '(')
            stack.push(i);
        
        // if character is ')' pop out elements
        // from stack until '(' is found or
        // the stack becomes empty
        else if (i == ')') {
            ch = stack.stack[stack.top];
            while (stack.top > -1 && ch != '(') {
                prefix += stack.pop();
                ch = stack.stack[stack.top];
            }
            stack.pop();
        }
        
        // if the character is a digit or alphabet
        // add it to the answer string  
        else if (!isOperator(i)) {
            prefix += i;
        } 
        
        // if the character is any operator
        // pop out elements from stack until
        // the stack is empty or a symbol with
        // a higher precedence is found in the stack
        else if (isOperator(i)) {
            ch = stack.stack[stack.top];
            while (stack.top > -1 && (priority(i) <= priority(ch))) {
                prefix += stack.pop();
                ch = stack.stack[stack.top];
            }
            stack.push(i);
        }
    }
    
    // Pop out all remaning elements in
    // the stack and add it to answer string
    while (stack.top > -1)
        prefix += stack.pop();
    
    // Return the reversed answer string
    return prefix.split('').reverse().join('');
}

console.log(infixToPrefix("x^y/(5*z)+2"));