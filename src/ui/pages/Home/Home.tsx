import { useState } from "react";
import MathematicalOperations from "./MathematicalOperations";

import "./style.css";

const Home = () => {
    const [current, setCurrent] = useState<string>("");
    const [previous, setPrevious] = useState<string>();
    const [result, setResult] = useState<number>();
    const [operationSelected, setOperationSelected] = useState<MathematicalOperations | null>(null);
    const [controllerContinuousOperations, setControllerContinuousOperations] = useState<boolean>(false);

    const handleClickNumber = (number: string) => {
        setCurrent(current + number);
    }

    const handleClearNumber = () => {
        if (current) {
            if (Number(current) < 0) {
                setCurrent(current.slice(1, -1));
            } else {
                setCurrent(current.slice(0, -1));
            }
        } else {
            if (Number(previous) < 0) {
                setPrevious(previous!.slice(1, -1));
            } else {
                setPrevious(previous!.slice(0, -1));
            }
        }
    }

    const handleClearDisplay = () => {
        setCurrent("");
        setPrevious("");
        setResult(0);
        setOperationSelected(null);
        setControllerContinuousOperations(false);
    }

    const handleOperatorClicked = (operator: MathematicalOperations) => {
        if (current.length) {
            if (controllerContinuousOperations) { //controller to perform continuous operations.
                switch (operator) {
                    case MathematicalOperations.PLUS:
                        const sum = Number(previous) + Number(current);
                        setCurrent("");
                        setPrevious(String(sum));
                        setOperationSelected(operator);
                        break;

                    case MathematicalOperations.MINUS:
                        const minus = Number(previous) - Number(current);
                        setCurrent("");
                        setPrevious(String(minus));
                        setOperationSelected(operator);
                        break;

                    case MathematicalOperations.MULTIPLICATION:
                        const multiplication = Number(previous) * Number(current);
                        setCurrent("");
                        setPrevious(String(multiplication));
                        setOperationSelected(operator);
                        break;

                    case MathematicalOperations.DIVIDE:
                        const divide = Number(previous) / Number(current);
                        setCurrent("");
                        setPrevious(String(divide));
                        setOperationSelected(operator);
                        break;
                }
            } else {
                setControllerContinuousOperations(true);
                setCurrent("");
                setPrevious(current);
                setOperationSelected(operator);
            }
        }
    }

    const handlePercentageOperator = () => {
        if (current.length) {
            setCurrent(String(Number(current) / 100));
        }
    }

    const handleDecimalNumber = () => {
        if (current.length) {
            if (!current.includes(".")) {
                setCurrent(current + ".");
            }
        }
    }

    const handlePlusMinus = (operator: MathematicalOperations) => {
        if (previous && operator && current) {
            switch (operator) {
                case MathematicalOperations.PLUS:
                    setOperationSelected(MathematicalOperations.MINUS);
                    break;

                case MathematicalOperations.MINUS:
                    setOperationSelected(MathematicalOperations.PLUS);
                    break;

                case MathematicalOperations.MULTIPLICATION:
                    setCurrent(String(Number(current) * (-1)));
                    break;

                case MathematicalOperations.DIVIDE:
                    setCurrent(String(Number(current) * (-1)));
                    break;
            }
        } else {
            if (current.length) {
                setCurrent(String(Number(current) * (-1)));
            }
        }
    }

    const handleResult = (operator: MathematicalOperations | null) => {
        if (operator) {
            switch (operator) {
                case MathematicalOperations.PLUS:
                    const plus = Number(previous) + Number(current);
                    setResult(plus);
                    setCurrent("");
                    setPrevious("");
                    setOperationSelected(null);
                    setControllerContinuousOperations(false);
                    break;

                case MathematicalOperations.MINUS:
                    const minus = Number(previous) - Number(current);
                    setResult(minus);
                    setCurrent("");
                    setPrevious("");
                    setOperationSelected(null);
                    setControllerContinuousOperations(false);
                    break;

                case MathematicalOperations.MULTIPLICATION:
                    const multiplication = Number(previous) * Number(current);
                    setResult(multiplication);
                    setCurrent("");
                    setPrevious("");
                    setOperationSelected(null);
                    setControllerContinuousOperations(false);
                    break;

                case MathematicalOperations.DIVIDE:
                    const divide = Number(previous) / Number(current);
                    setResult(divide);
                    setCurrent("");
                    setPrevious("");
                    setOperationSelected(null);
                    setControllerContinuousOperations(false);
                    break;
            }
        } else {
            setCurrent("");
            setResult(Number(current));
        }
    }

    return (
        <div className="container">
            <div className="display">
                {previous! ?
                    <span>{previous} {operationSelected} {Number(current) < 0 && current.length ? `(${current})` : current}</span> :
                    <span>{current}</span>}

                <div className="result">
                    <img src="equals.png" alt="Equals Operator" />
                    <span>{result ? result : 0}</span>
                </div>
            </div>

            <div className="buttons">
                <div className="row">
                    <input type="button" value="CE" onClick={handleClearNumber} />
                    <input type="button" value="C" onClick={handleClearDisplay} />
                    <input type="button" value="&#37;" onClick={handlePercentageOperator} />
                    <input type="button" value="&divide;" className="operator" onClick={() => handleOperatorClicked(MathematicalOperations.DIVIDE)} />
                </div>

                <div className="row">
                    <input type="button" value="7" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="8" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="9" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="X" className="operator" onClick={() => handleOperatorClicked(MathematicalOperations.MULTIPLICATION)} />
                </div>

                <div className="row">
                    <input type="button" value="4" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="5" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="6" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&minus;" className="operator" onClick={() => handleOperatorClicked(MathematicalOperations.MINUS)} />
                </div>

                <div className="row">
                    <input type="button" value="1" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="2" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="3" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&#43;" className="operator" onClick={() => handleOperatorClicked(MathematicalOperations.PLUS)} />
                </div>

                <div className="row">
                    <input type="button" value="&plusmn;" onClick={() => handlePlusMinus(operationSelected!)} />
                    <input type="button" value="0" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="," onClick={handleDecimalNumber} />
                    <input type="button" value="&#61;" className="operator" onClick={() => handleResult(operationSelected)} />
                </div>
            </div>
        </div>
    );
}

export default Home;