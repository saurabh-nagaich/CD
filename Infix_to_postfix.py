
def reverse(str):
    return("".join(reversed(str)))

def priority(operator):
    if operator == '+' or operator == '-':
        return 1
 
    elif operator == '*' or operator == '/' or operator == '%':
        return 2
 
    elif operator == '^':
        return 3
 
    else:
        return 0

def in2prefix(infixString):
 
    infixString = reverse(infixString)
    stack = []
    # result string variable
    prefixString = ""
    i = 0
 
    while i in range(0, len(infixString)):
        if infixString[i].isalpha():
            prefixString += infixString[i]
        elif infixString[i] == ')' or infixString[i] == ']' or infixString[i] == '}':
            stack.append(infixString[i])
        elif infixString[i] == '(' or infixString[i] == '[' or infixString[i] == '{':
 
            if infixString[i] == '(':
                while stack[-1] != ')':
                    prefixString += stack.pop()
                stack.pop()
 
            if infixString[i] == '[':
                while stack[-1] != ']':
                    prefixString += stack.pop()
                stack.pop()
 
            if infixString[i] == '{':
                while stack[-1] != '}':
                    prefixString += stack.pop()
                stack.pop()
        else:

            if len(stack) == 0:
                stack.append(infixString[i])
 
            else:
 
                if priority(infixString[i]) >= priority(stack[-1]):
                    stack.extend(infixString[i])
 
                elif priority(infixString[i]) < priority(stack[-1]):
                    prefixString += stack.pop()
                    position = len(stack) - 1
                    while position >= 0 and priority(stack[position]) > priority(infixString[i]):
                        prefixString += stack.pop()
                        position -= 1
                        if position < 0:
                            break
                    stack.extend(infixString[i])

        i += 1
    while len(stack) != 0:
        prefixString += stack.pop()
    prefixString = reverse(prefixString)
    return prefixString

infix = input("Enter the Infix Expression : ")
prefix = in2prefix(infix)
print("The converted Expression in Postfix is : " + prefix)
