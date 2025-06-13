import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    setWaitingForSecondOperand(true);
  };

  return (
    <Card className="w-full max-w-xs shadow-lg">
      <CardHeader className="bg-gray-800 rounded-t-lg">
        <CardTitle className="text-white">
          <div className="text-right p-2 h-14 font-mono text-2xl overflow-hidden">
            {display}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="font-bold"
            onClick={clearDisplay}
          >
            C
          </Button>
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => setDisplay(display.charAt(0) === "-" ? display.substring(1) : "-" + display)}
          >
            +/-
          </Button>
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => performOperation("%")}
          >
            %
          </Button>
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 font-bold"
            onClick={() => performOperation("/")}
          >
            ÷
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="font-bold"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 font-bold"
            onClick={() => performOperation("*")}
          >
            ×
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="font-bold"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 font-bold"
            onClick={() => performOperation("-")}
          >
            -
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="font-bold"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 font-bold"
            onClick={() => performOperation("+")}
          >
            +
          </Button>

          <Button
            variant="outline"
            className="col-span-2 font-bold"
            onClick={() => inputDigit("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="font-bold"
            onClick={inputDecimal}
          >
            .
          </Button>
          <Button
            variant="default"
            className="bg-amber-500 hover:bg-amber-600 font-bold"
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}