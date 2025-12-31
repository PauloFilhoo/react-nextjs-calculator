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

export function Keyboard() {
  const [state, setState] = useState(initialState);

  function clearMemory() {
    setState(initialState);
    console.log("Memory cleared!");
  }

  function deleteLast() {
    if (state.operation === "" || state.operation && state.current === 1 && state.values[1] !== 0) {
      setState((prevState) => {
        let { displayValue, values } = prevState;

        if (displayValue.length === 1) {
          displayValue = "0";
          values[prevState.current] = 0;
        } else {
          displayValue = displayValue.slice(0, -1);
          values[prevState.current] = parseFloat(displayValue) || 0;
        }

        return { ...prevState, displayValue };
      });
    }

  }

  function setOperation(op: string) {
    if (op !== "=" && state.values[0] === 0 || op === "=" && state.values[1] === 0) {
      return console.log("Ignoring operation on initial zero display");
    }
    // Setting operation if the current value is on the first param, if the user pressed a digit and if theres no operation before. 
    if (state.current === 0 && state.lastDigit !== "" && state.operation === "") {
      setState({ ...state, operation: op, current: 1, clearDisplay: true });
    }
    // Setting operation if theres no operation before, it's not the equal op and it's on the first current value and if theres no lastDigit
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

  function compactMode() {
    if (state.displayValue.length > 9) {
      console.log("Compact!")
      return <Display value={state.displayValue} operation={state.operation} compact />
    } else {
      console.log("not Compact!")
      return <Display value={state.displayValue} operation={state.operation} />
    }
  }

  return (
    <>
      {/* <Display value={state.displayValue} operation={state.operation} /> */}
      {compactMode()}
      <ul className="calc-grid ">
        <Button label="AC" click={clearMemory} double />
        <Button label="X" click={deleteLast} opsymbol="/icons/delete-icon.svg" />
        <Button operation label="/" opsymbol="/icons/divide-icon.svg" click={setOperation} />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button operation label="*" opsymbol="/icons/x-icon.svg" click={setOperation} />
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
