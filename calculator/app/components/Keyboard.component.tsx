"use client";
import { useEffect } from "react";
import { Button } from "./Button.component";
import { useState } from "react";
import { Display } from "./Display.component";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export function CalcKeyboard() {
  const [state, setState] = useState(initialState);

  function clearMemory() {
    setState(initialState);
    console.log("Memory cleared!");
  }

  function deleteLast() {
    console.log("Deleted last digit!");
  }

  function setOperation(op: string) {
    console.log(`Operation set to ${op}`);
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
          const newValue = parseFloat(displayValue)
          const newValues = [...newState.values]
          newValues[index] = newValue
          newState.values = newValues
          console.log(newValues);
          console.log("Valor da variavel" + " " + newState.values);
        }
        return newState;
      }
    });
  }


  return (
    <>
      <Display value={state.displayValue} />
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
