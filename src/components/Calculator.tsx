import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-2 bg-gray-50 border rounded-md text-right text-2xl font-mono h-12 flex items-center justify-end">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={clearDisplay} className="col-span-2">
            Clear
          </Button>
          <Button variant="outline" onClick={() => performOperation("/")} className="text-blue-600">
            ÷
          </Button>
          <Button variant="outline" onClick={() => performOperation("*")} className="text-blue-600">
            ×
          </Button>

          <Button variant="outline" onClick={() => inputDigit("7")}>7</Button>
          <Button variant="outline" onClick={() => inputDigit("8")}>8</Button>
          <Button variant="outline" onClick={() => inputDigit("9")}>9</Button>
          <Button variant="outline" onClick={() => performOperation("-")} className="text-blue-600">
            −
          </Button>

          <Button variant="outline" onClick={() => inputDigit("4")}>4</Button>
          <Button variant="outline" onClick={() => inputDigit("5")}>5</Button>
          <Button variant="outline" onClick={() => inputDigit("6")}>6</Button>
          <Button variant="outline" onClick={() => performOperation("+")} className="text-blue-600">
            +
          </Button>

          <Button variant="outline" onClick={() => inputDigit("1")}>1</Button>
          <Button variant="outline" onClick={() => inputDigit("2")}>2</Button>
          <Button variant="outline" onClick={() => inputDigit("3")}>3</Button>
          <Button variant="outline" onClick={handleEquals} className="bg-blue-600 text-white hover:bg-blue-700">
            =
          </Button>

          <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">
            0
          </Button>
          <Button variant="outline" onClick={inputDecimal}>.</Button>
        </div>
      </CardContent>
    </Card>
  );
}