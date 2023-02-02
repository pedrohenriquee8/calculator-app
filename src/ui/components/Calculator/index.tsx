import { useState } from "react";
import MathematicalOperators from "./enum/MathematicalOperators";

import "./style.css";

const Calculator = () => {
    const [numbersDigited, setNumbersDigited] = useState<string>("");
    const [copyNumbersDigited, setCopyNumbersDigited] = useState<string>();
    const [resultCalculation, setResultCalculation] = useState<number>();
    const [operatorsSelected, setOperatorsSelected] = useState<MathematicalOperators | null>(null);

    const handleClickNumber = (number: string) => {
        setNumbersDigited(numbersDigited + number);
    }

    const handleClearNumber = () => {
        if (Number(numbersDigited) < 0 && numbersDigited.length === 2) {
            setNumbersDigited(numbersDigited.slice(1, numbersDigited.length - 1));
        } else {
            setNumbersDigited(numbersDigited.slice(0, numbersDigited.length - 1));
        }
    }

    const handleClearDisplay = () => {
        setNumbersDigited("");
        setCopyNumbersDigited("");
        setResultCalculation(0);
        setOperatorsSelected(null);
    }

    const handleOperatorsClicked = (operator: MathematicalOperators) => {
        setCopyNumbersDigited(numbersDigited);
        setNumbersDigited("");
        setOperatorsSelected(operator);
    }

    const handlePercentageOperator = () => {
        setNumbersDigited(String(Number(numbersDigited) / 100));
    }

    const handleDecimalNumber = () => {
        if (!numbersDigited.includes(".")) {
            setNumbersDigited(numbersDigited + ".");
        }
    }

    const handlePlusMinus = (operator: MathematicalOperators) => {
        if (operator && copyNumbersDigited) {
            switch (operator) {
                case MathematicalOperators.PLUS:
                    setOperatorsSelected(MathematicalOperators.MINUS);
                    break;

                case MathematicalOperators.MINUS:
                    setOperatorsSelected(MathematicalOperators.PLUS);
                    break;
            }
        } else {
            setNumbersDigited(String(Number(numbersDigited) * (-1)));
        }
    }

    const handleResultCalculation = (operator: MathematicalOperators | null) => {
        if (operator) {
            switch (operator) {
                case MathematicalOperators.PLUS:
                    const plus = Number(copyNumbersDigited) + Number(numbersDigited);
                    setResultCalculation(plus);
                    setNumbersDigited(String(plus));
                    setCopyNumbersDigited("");
                    break;

                case MathematicalOperators.MINUS:
                    const minus = Number(copyNumbersDigited) - Number(numbersDigited);
                    setResultCalculation(minus);
                    setNumbersDigited(String(minus));
                    setCopyNumbersDigited("");
                    break;

                case MathematicalOperators.MULTIPLICATION:
                    const multiplication = Number(copyNumbersDigited) * Number(numbersDigited);
                    setResultCalculation(multiplication);
                    setNumbersDigited(String(multiplication));
                    setCopyNumbersDigited("");
                    break;

                case MathematicalOperators.DIVIDE:
                    const divide = Number(copyNumbersDigited) / Number(numbersDigited);
                    setResultCalculation(divide);
                    setNumbersDigited(String(divide));
                    setCopyNumbersDigited("");
                    break;
            }
        } else {
            setResultCalculation(Number(numbersDigited));
        }
    }

    return (
        <div className="container">
            <div className="display">
                {copyNumbersDigited! ?
                    <div className="numbers">
                        <span>{copyNumbersDigited} {operatorsSelected} {numbersDigited}</span>
                    </div> :
                    <span>{numbersDigited}</span>}

                <div className="result">
                    <img src="equals.png" alt="Equals Operator" />
                    <span>{resultCalculation ? resultCalculation : 0}</span>
                </div>
            </div>

            <div className="buttons">
                <div className="row">
                    <input type="button" value="CE" onClick={handleClearDisplay} />
                    <input type="button" value="C" onClick={handleClearNumber} />
                    <input type="button" value="&#37;" onClick={handlePercentageOperator} />
                    <input type="button" value="&divide;" className="operator" onClick={() => handleOperatorsClicked(MathematicalOperators.DIVIDE)} />
                </div>

                <div className="row">
                    <input type="button" value="7" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="8" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="9" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="X" className="operator" onClick={() => handleOperatorsClicked(MathematicalOperators.MULTIPLICATION)} />
                </div>

                <div className="row">
                    <input type="button" value="4" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="5" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="6" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&minus;" className="operator" onClick={() => handleOperatorsClicked(MathematicalOperators.MINUS)} />
                </div>

                <div className="row">
                    <input type="button" value="1" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="2" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="3" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="&#43;" className="operator" onClick={() => handleOperatorsClicked(MathematicalOperators.PLUS)} />
                </div>

                <div className="row">
                    <input type="button" value="&plusmn;" onClick={() => handlePlusMinus(operatorsSelected!)} />
                    <input type="button" value="0" onClick={(e) => handleClickNumber(e.currentTarget.value)} />
                    <input type="button" value="," onClick={handleDecimalNumber} />
                    <input type="button" value="&#61;" className="operator" onClick={() => handleResultCalculation(operatorsSelected)} />
                </div>
            </div>
        </div>
    );
}

export default Calculator;