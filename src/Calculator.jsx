import { useEffect, useState } from "react";
import "./index.css";
import History from "./History";

const Calculator = () => {
  const [operant, setOperant] = useState(""),
    [showHistory, setShowHistory] = useState(false),
    [history, setHistory] = useState(() => {
      const savedHistory = JSON.parse(
        localStorage.getItem("calculatorHistory")
      );
      return savedHistory || [];
    });

  const operations = ["+", "-", "/", ".", "*"],
    numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const buttonHandler = (button) => {
    if (operant === "Error") {
      return;
    }
    if (
      (operations.includes(operant[operant.length - 1]) &&
        operations.includes(button)) ||
      (operations.includes(button) && operant === "")
    ) {
      return;
    }
    if (operant === "0" && !operations.includes(button)) {
      return;
    }
    try {
      setOperant(operant + String(button));
    } catch {
      setOperant("Syntax Error");
    }
  };

  const equalsHandler = () => {
    if (operant === "Error") {
      return;
    }
    try {
      const res = String(eval(operant || 0));
      setOperant(res);
      const newEntry = { expression: operant, result: res };
      setHistory((prevHistory) => [...prevHistory, newEntry]);
    } catch (error) {
      setOperant("Error");
    }
  };

  const ceHandler = () => {
    if (operant === "Error" || operant === "0") {
      return;
    }
    const lastOperatorIndex = Math.max(
      operant.lastIndexOf("+"),
      operant.lastIndexOf("-"),
      operant.lastIndexOf("*"),
      operant.lastIndexOf("/")
    );
    if (lastOperatorIndex !== -1) {
      setOperant(operant.slice(0, lastOperatorIndex + 1));
    } else {
      setOperant("");
    }
  };

  const acHandler = () => {
    setOperant("");
  };

  const delHandler = () => {
    setOperant(operant.slice(0, -1));
  };

  const handleDeleteHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (numbers.includes(key) || operations.includes(key)) {
        buttonHandler(key);
      } else if (key === "Enter" || key === "=") {
        equalsHandler();
      } else if (key === "Backspace") {
        delHandler();
      } else if (key === "Delete") {
        acHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [operant]);

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setShowHistory(!showHistory)}
      >
        &#9776;
      </button>
      <div className="calculator-main">
        <div className="calculator">
          <div className="display">{operant || 0}</div>
          <div className="buttons">
            <button onClick={() => buttonHandler(7)}>7</button>
            <button onClick={() => buttonHandler(8)}>8</button>
            <button onClick={() => buttonHandler(9)}>9</button>
            <button onClick={delHandler}>DEL</button>
            <button onClick={acHandler}>C</button>
            <button onClick={() => buttonHandler(4)}>4</button>
            <button onClick={() => buttonHandler(5)}>5</button>
            <button onClick={() => buttonHandler(6)}>6</button>
            <button onClick={() => buttonHandler("*")}>*</button>
            <button onClick={() => buttonHandler("/")}>/</button>
            <button onClick={() => buttonHandler(1)}>1</button>
            <button onClick={() => buttonHandler(2)}>2</button>
            <button onClick={() => buttonHandler(3)}>3</button>
            <button onClick={() => buttonHandler("+")}>+</button>
            <button onClick={equalsHandler} className="span-two">
              =
            </button>
            <button onClick={() => buttonHandler(0)}>0</button>
            <button onClick={() => buttonHandler(".")}>.</button>
            <button onClick={ceHandler}>CE</button>
            <button onClick={() => buttonHandler("-")} className="minus-button">
              -
            </button>
          </div>
        </div>
      </div>
      <History
        history={history}
        showHistory={showHistory}
        onDeleteHistory={handleDeleteHistory}
      />
    </>
  );
};

export default Calculator;
