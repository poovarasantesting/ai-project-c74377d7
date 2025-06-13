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
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-4 rounded mb-4 text-right overflow-hidden">
          <div className="text-3xl font-medium truncate">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="text-lg font-medium h-14"
            onClick={clearDisplay}
          >
            C
          </Button>
          <Button
            variant="outline"
            className="text-lg font-medium h-14"
            onClick={() => setDisplay(display.slice(0, -1) || "0")}
          >
            ←
          </Button>
          <Button
            variant="secondary"
            className="text-lg font-medium h-14"
            onClick={() => performOperation("%")}
          >
            %
          </Button>
          <Button
            variant="secondary"
            className="text-lg font-medium h-14"
            onClick={() => performOperation("/")}
          >
            ÷
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="text-lg font-medium h-14"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="secondary"
            className="text-lg font-medium h-14"
            onClick={() => performOperation("*")}
          >
            ×
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="text-lg font-medium h-14"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="secondary"
            className="text-lg font-medium h-14"
            onClick={() => performOperation("-")}
          >
            -
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="text-lg font-medium h-14"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="secondary"
            className="text-lg font-medium h-14"
            onClick={() => performOperation("+")}
          >
            +
          </Button>

          <Button
            variant="outline"
            className="text-lg font-medium h-14 col-span-2"
            onClick={() => inputDigit("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="text-lg font-medium h-14"
            onClick={inputDecimal}
          >
            .
          </Button>
          <Button
            variant="primary"
            className="text-lg font-medium h-14 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}