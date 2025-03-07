import { useState } from "react";
import style from "./App.module.css";

export function App() {
  const array = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "=", "C", "-", "+"];
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");
  const [userInput, setUserInput] = useState("");

  const sortedArray = array.reduce((acc, item, index) => {
    if (index % 4 === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  const clickOnNumber = (number) => {
    operator
      ? setOperand2(
          (value) => value + number,
          setUserInput(operand1 + operator + (operand2 + number))
        )
      : setOperand1((value) => value + number, setUserInput(operand1 + number));
  };

  const clickOnResult = () => {
    operator === "" && setUserInput(0);

    operator === "+"
      ? setUserInput(Number(operand1) + Number(operand2))
      : setUserInput(Number(operand1) - Number(operand2));

    setOperand1("");
    setOperand2("");
    setOperator("");
  };

  const clickOnOperator = (item) => {
    operator === "" || operand2 ? setOperator(item) : setOperator(item);
  };

  const clickOnReset = () => {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setUserInput("");
  };

  return (
    <>
      <div className={style.calculator}>
        <div className={style.content}>
          <input type="text" value={userInput || "0"} placeholder="0" />

          {sortedArray.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((item, index) =>
                typeof item === "number" ? (
                  <button key={index} onClick={() => clickOnNumber(item)}>
                    {item}
                  </button>
                ) : item === "C" ? (
                  <button
                    key={index}
                    className={style.reset}
                    onClick={clickOnReset}
                  >
                    {item}
                  </button>
                ) : item === "=" ? (
                  <button
                    key={index}
                    className={style.equal}
                    onClick={clickOnResult}
                  >
                    {item}
                  </button>
                ) : item === "+" ? (
                  <button
                    key={index}
                    className={style.sum}
                    onClick={() => clickOnOperator(item)}
                  >
                    {item}
                  </button>
                ) : (
                  <button
                    key={index}
                    className={style.min}
                    onClick={() => clickOnOperator(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
