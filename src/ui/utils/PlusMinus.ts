import MathematicalOperations from "../types/MathematicalOperations";

const calculateAccordingPlusMinus = (operation: MathematicalOperations, current: string): MathematicalOperations | string => {
    let operationPlusMinus;
    
    switch(operation) {
        case MathematicalOperations.PLUS:
            operationPlusMinus = MathematicalOperations.MINUS;    
            break;

        case MathematicalOperations.MINUS:
            operationPlusMinus = MathematicalOperations.PLUS;
            break;

        case MathematicalOperations.MULTIPLICATION:
            operationPlusMinus = String(Number(current) * (-1));
            break;

        case MathematicalOperations.DIVIDE:
            operationPlusMinus = String(Number(current) * (-1));
            break;
    }

    return operationPlusMinus;
}

export default calculateAccordingPlusMinus;