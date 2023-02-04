import { useState } from "react";
import MathematicalOperations from "./MathematicalOperations";

import "./style.css";

const Home = () => {
    const [current, setCurrent] = useState<string>("");
    const [previous, setPrevious] = useState<string>();
    const [result, setResult] = useState<number>();
    const [selectedOperation, setSelectedOperation] = useState<MathematicalOperations | null>();
    const [controller, setController] = useState<boolean>(false);

    const handleClickNumber = (number: string) => { //Add a new number to the current string.
        setCurrent(current + number);
    }

    const handleClearNumber = () => { //Clear the last number of the current string.
        if (current) { //If the current string exists.
            if (Number(current) < 0) { //If the current string is negative.
                setCurrent(current.slice(1, -1));
            } else { //If the current string is positive.
                setCurrent(current.slice(0, -1));
            }
        } else { //If the current string doesn't exist.
            if (Number(previous) < 0) { //If the previous string is negative.
                setPrevious(previous!.slice(1, -1));
            } else { //If the previous string is positive.
                setPrevious(previous!.slice(0, -1));
            }
        }
    }

    const handleClearDisplay = () => { //Clear the current and previous strings, the result and the selected operation.
        setCurrent("");
        setPrevious("");
        setResult(0);
        setSelectedOperation(null);
    }

    const handleOperationClicked = (operation: MathematicalOperations) => { //Add the operation to the selected operation.
        if (current.length) { //If the current string exists.
            if (controller) { //If the controller for continuous calculations is true.
                if (operation !== selectedOperation) { //If the selected operation is different from the operation current.
                    switch (selectedOperation) {
                        case MathematicalOperations.PLUS:
                            const sum = Number(previous) + Number(current);
                            setCurrent("");
                            setPrevious(String(sum));
                            setSelectedOperation(operation);
                            break;
                        case MathematicalOperations.MINUS:
                            const minus = Number(previous) - Number(current);
                            setCurrent("");
                            setPrevious(String(minus));
                            setSelectedOperation(operation);
                            break;
                        case MathematicalOperations.MULTIPLICATION:
                            const multiplication = Number(previous) * Number(current);
                            setCurrent("");
                            setPrevious(String(multiplication));
                            setSelectedOperation(operation);
                            break;
                        case MathematicalOperations.DIVIDE:
                            const divide = Number(previous) / Number(current);
                            setCurrent("");
                            setPrevious(String(divide));
                            setSelectedOperation(operation);
                            break;
                    }
                } else { //If the selected operation is the same as the operation current.
                    switch (operation) {
                        case MathematicalOperations.PLUS:
                            const sum = Number(previous) + Number(current);
                            setCurrent("");
                            setPrevious(String(sum));
                            setSelectedOperation(operation);
                            break;

                        case MathematicalOperations.MINUS:
                            const minus = Number(previous) - Number(current);
                            setCurrent("");
                            setPrevious(String(minus));
                            setSelectedOperation(operation);
                            break;

                        case MathematicalOperations.MULTIPLICATION:
                            const multiplication = Number(previous) * Number(current);
                            setCurrent("");
                            setPrevious(String(multiplication));
                            setSelectedOperation(operation);
                            break;

                        case MathematicalOperations.DIVIDE:
                            const divide = Number(previous) / Number(current);
                            setCurrent("");
                            setPrevious(String(divide));
                            setSelectedOperation(operation);
                            break;
                    }
                }
            } else { //If the controller for continuous calculations is false.
                setCurrent("");
                setPrevious(current);
                setSelectedOperation(operation);
                setController(true);
            }
        }
    }

    const handleOperationPercent = () => { //Calculate the percent of the current string.
        if (current.length) {
            setCurrent(String(Number(current) / 100));
        }
    }

    const handleDecimalNumber = () => { //Add a decimal number to the current string.
        if (current.length) {
            if (!current.includes(".")) {
                setCurrent(current + ".");
            }
        }
    }

    const handlePlusMinus = (operation: MathematicalOperations) => { //Change the sign of the current string.
        if (previous && operation && current) { //If the previous string, the selected operation and the current string exist to do the operations with the current value.
            switch (operation) {
                case MathematicalOperations.PLUS:
                    setSelectedOperation(MathematicalOperations.MINUS);
                    break;

                case MathematicalOperations.MINUS:
                    setSelectedOperation(MathematicalOperations.PLUS);
                    break;

                case MathematicalOperations.MULTIPLICATION:
                    setCurrent(String(Number(current) * (-1)));
                    break;

                case MathematicalOperations.DIVIDE:
                    setCurrent(String(Number(current) * (-1)));
                    break;
            }
        } else { //If the previous string, the selected operation and the current string don't exist to do the operations with the current string.
            if (current.length) {
                setCurrent(String(Number(current) * (-1)));
            }
        }
    }

    const handleResult = (operation: MathematicalOperations | null) => { //Calculate the result of the operation.
        if (operation) { //If the selected operation exists.
            switch (operation) { //Do the operation with the previous and current strings according to the enum MathematicalOperations, in addition to resetting the string values.
                case MathematicalOperations.PLUS:
                    const plus = Number(previous) + Number(current);
                    setResult(plus);
                    setCurrent("");
                    setPrevious("");
                    setSelectedOperation(null);
                    setController(false);
                    break;

                case MathematicalOperations.MINUS:
                    const minus = Number(previous) - Number(current);
                    setResult(minus);
                    setCurrent("");
                    setPrevious("");
                    setSelectedOperation(null);
                    setController(false);
                    break;

                case MathematicalOperations.MULTIPLICATION:
                    const multiplication = Number(previous) * Number(current);
                    setResult(multiplication);
                    setCurrent("");
                    setPrevious("");
                    setSelectedOperation(null);
                    setController(false);
                    break;

                case MathematicalOperations.DIVIDE:
                    const divide = Number(previous) / Number(current);
                    setResult(divide);
                    setCurrent("");
                    setPrevious("");
                    setSelectedOperation(null);
                    setController(false);
                    break;
            }
        } else { //If the selected operation doesn't exist.
            setCurrent("");
            setController(false);
            setResult(Number(current));
        }
    }

    return (
        <div className="container">
            <div className="display">
                {previous! ?
                    <span>{previous} {selectedOperation} {Number(current) < 0 && current.length ? `(${current})` : current}</span> :
                    <span>{current}</span>}

                <div className="result">
                    <img src="equals.png" alt="Equals operation" />
                    <span>{result ? result : 0}</span>
                </div>
            </div>

            <div className="buttons">
                <div className="row">
                    <input type="button" value="CE" onClick={handleClearNumber} />
                    <input type="button" value="C" onClick={handleClearDisplay} />
                    <input type="button" value="&#37;" onClick={handleOperationPercent} />
                    <input type="button" value="&divide;" className="operation" onClick={() => handleOperationClicked(MathematicalOperations.DIVIDE)} />
                </div>

                <div className="row">
                    <input type="button" value="7" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="8" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="9" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="X" className="operation" onClick={() => handleOperationClicked(MathematicalOperations.MULTIPLICATION)} />
                </div>

                <div className="row">
                    <input type="button" value="4" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="5" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="6" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&minus;" className="operation" onClick={() => handleOperationClicked(MathematicalOperations.MINUS)} />
                </div>

                <div className="row">
                    <input type="button" value="1" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="2" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="3" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&#43;" className="operation" onClick={() => handleOperationClicked(MathematicalOperations.PLUS)} />
                </div>

                <div className="row">
                    <input type="button" value="&plusmn;" onClick={() => handlePlusMinus(selectedOperation!)} />
                    <input type="button" value="0" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="," onClick={handleDecimalNumber} />
                    <input type="button" value="&#61;" className="operation" onClick={() => handleResult(selectedOperation!)} />
                </div>
            </div>
        </div>
    );
}

export default Home;