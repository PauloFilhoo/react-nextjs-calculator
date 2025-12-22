"use client";
import { useEffect } from "react";
import { Button } from "./Button.component";
import { useState } from "react";
import { Display } from "./Display.component";
import { stat } from "fs";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: "",
  values: [0, 0],
  current: 0,
  lastDigit: "",
};

export function CalcKeyboard() {
  const [state, setState] = useState(initialState);

  function clearMemory() {
    setState(initialState);
    console.log("Memory cleared!");
  }

  function deleteLast() {
    setState((prevState) => {
      let { displayValue, values } = prevState;

      if (displayValue.length === 1) {
        displayValue = "0";
      } else {
        displayValue = displayValue.slice(0, -1);
        values[prevState.current] = parseFloat(displayValue) || 0;
      }

      return { ...prevState, displayValue };
    });
  }

  function setOperation(op: string) {
    if (op !== "=" && state.displayValue === "0") {
      return console.log("Ignoring operation on initial zero display");
    }

    if (state.current === 0 && state.lastDigit !== "" && state.operation === "") {
      setState({ ...state, operation: op, current: 1, clearDisplay: true });
    } 
    
    if (state.operation === "" && op !== "=" && state.current === 0 && state.lastDigit === "") {
      const first = parseFloat(state.displayValue) || 0;
      setState({
        ...state,
        operation: op,
        values: [first, 0],
        current: 1,
        clearDisplay: true,
        lastDigit: "",
      });
      return;
    } else {
      let result = 0;
      const equal = op === "=";
      const currentOp = state.operation

      const values = state.values
      switch (currentOp) {
        case "+":
          result = values[0] + values[1];
          console.log(result);
          break;
        case "-":
          result = values[0] - values[1];
          console.log(result);
          break;
        case "/":
          if (values[1] === undefined || values.includes(0)) {
            console.log("Cannot divide by zero");
            return;
          }
          result = values[0] / values[1];
          console.log(result);
          break;
        case "*":
          result = values[0] * values[1];
          console.log(result);
          break;
        default:
          return console.log('No operation!');
      }

      setState({
        displayValue: String(result),
        values: equal ? [0, 0] : [result, 0],
        operation: equal ? "" : op,
        current: equal ? 0 : 1,
        clearDisplay: !equal,
        lastDigit: "",
      })
      console.log(`Operation: ${currentOp}, Result: ${result} Values: ${values}, ${state.current}`);
    }
  }

  function addDigit(n: string) {
    if (n === "." && state.displayValue.includes(".")) {
      return; // Ignore if '.' is already present
    }

    const clearDisplay = state.displayValue === "0" || state.clearDisplay;
    const currentValue = clearDisplay ? "" : state.displayValue;
    const displayValue = currentValue + n;

    setState((prevState) => {
      {
        const newState = { ...prevState, displayValue, clearDisplay: false };
        if (n !== ".") {
          const index = newState.current;
          const newValue = parseFloat(displayValue);
          const newValues = [...newState.values];
          newValues[index] = newValue;
          newState.values = newValues;
          newState.lastDigit = n;
        }
        return newState;
      }
    });
  }

  return (
    <>
      <Display value={state.displayValue} operation={state.operation} />
      <ul className="calc-grid ">
        <Button label="AC" click={clearMemory} double />
        <Button label="X" click={deleteLast} />
        <Button operation label="/" click={setOperation} />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button operation label="*" click={setOperation} />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button operation label="-" click={setOperation} />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button operation label="+" click={setOperation} />
        <Button double label="0" click={addDigit} />
        <Button label="." click={addDigit} />
        <Button operation label="=" click={setOperation} />
      </ul>
    </>
  );
}
