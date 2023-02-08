import MathematicalOperations from "../types/MathematicalOperations";

const calculateAccordingOperation = (operation: MathematicalOperations, previous: string, current: string): number => {
    let operationCalculation;

    switch (operation) {
        case MathematicalOperations.PLUS:
            operationCalculation = Number(previous) + Number(current);
            break;
         
        case MathematicalOperations.MINUS:
            operationCalculation = Number(previous) - Number(current);
            break;

        case MathematicalOperations.MULTIPLICATION:
            operationCalculation = Number(previous) * Number(current);
            break;

        case MathematicalOperations.DIVIDE:
            operationCalculation = Number(previous) / Number(current);
            break;
    }

    return operationCalculation;
}

export default calculateAccordingOperation;