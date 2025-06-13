import { useState } from "react";
import { Button } from "./ui/button";
import { X, Divide, Minus, Plus, Equal } from "lucide-react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-72">
      <div className="bg-gray-100 p-4 rounded-lg mb-4 text-right">
        <div className="text-3xl font-medium truncate">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant="outline" 
          onClick={clearDisplay}
          className="col-span-2 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
        >
          AC
        </Button>
        <Button 
          variant="outline" 
          onClick={() => performOperation("/")}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
        >
          <Divide size={18} />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => performOperation("*")}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
        >
          <X size={18} />
        </Button>
        
        <Button variant="outline" onClick={() => inputDigit("7")}>7</Button>
        <Button variant="outline" onClick={() => inputDigit("8")}>8</Button>
        <Button variant="outline" onClick={() => inputDigit("9")}>9</Button>
        <Button 
          variant="outline" 
          onClick={() => performOperation("-")}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
        >
          <Minus size={18} />
        </Button>
        
        <Button variant="outline" onClick={() => inputDigit("4")}>4</Button>
        <Button variant="outline" onClick={() => inputDigit("5")}>5</Button>
        <Button variant="outline" onClick={() => inputDigit("6")}>6</Button>
        <Button 
          variant="outline" 
          onClick={() => performOperation("+")}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
        >
          <Plus size={18} />
        </Button>
        
        <Button variant="outline" onClick={() => inputDigit("1")}>1</Button>
        <Button variant="outline" onClick={() => inputDigit("2")}>2</Button>
        <Button variant="outline" onClick={() => inputDigit("3")}>3</Button>
        <Button 
          variant="outline" 
          onClick={() => {
            if (operator && firstOperand !== null) {
              const inputValue = parseFloat(display);
              const result = calculate(firstOperand, inputValue, operator);
              setDisplay(String(result));
              setFirstOperand(result);
              setOperator(null);
              setWaitingForSecondOperand(true);
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white row-span-2"
        >
          <Equal size={18} />
        </Button>
        
        <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">0</Button>
        <Button variant="outline" onClick={inputDecimal}>.</Button>
      </div>
    </div>
  );
}