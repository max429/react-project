import {LineDirection} from "./parts/FindWordLetter";
import {ILetter} from "./FindWordPage";

function getAvailableDirections(position: {row: number; column: number}, size: number, oldDirection?: LineDirection):LineDirection[] {
    const availableDirections: LineDirection[] = [];
    const horizontal = !oldDirection || oldDirection === 'up' || oldDirection == 'down';
    const vertical = !oldDirection || oldDirection === 'left' || oldDirection === 'right';
    if (position.row !== 0 && vertical) {
        availableDirections.push('up');
    }
    if (position.row !== size - 1 && vertical) {
        availableDirections.push('down');
    }

    if (position.column !== size - 1 && horizontal) {
        availableDirections.push('right');
    }

    if (position.column !== 0 && horizontal) {
        availableDirections.push('left');
    }
    return availableDirections;
}

function changeDirection(position: {row: number; column: number}, size: number, oldDirection?: LineDirection): LineDirection {
    let directions: LineDirection[] = getAvailableDirections(position, size, oldDirection);
    return directions[Math.floor(Math.random() * (directions.length - 1))]
}

export function initializeField(alphabet: string, answerWord: string): {field: ILetter[][]; answer: ILetter[]} {
    const newField:ILetter[][]  = [];
    const newAnswer:ILetter[]  = [];

    const size = answerWord.length;
    for (let i = 0; i < size; i ++) {
        newField.push([]);
        for (let j = 0; j < size; j++) {
            newField[i].push({
                letter: alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
                position: {
                    row: i,
                    column: j,
                },
                id: 'i' + i.toString() + 'j' +  j.toString()
            })
        }
    }
    let position = {row: Math.floor(Math.random() * (size - 1)),
        column: Math.floor(Math.random() * (size - 1))};
    let direction = changeDirection(position, size);
    let i = 0;
    while (i < size) {
        newField[position.row][position.column] =
            {...newField[position.row][position.column], letter: answerWord[i]}
        newAnswer.push({...newField[position.row][position.column], letter: answerWord[i]})

        switch (direction) {
            case "down":
                position.row++;
                break;
            case "up":
                position.row--;
                break;
            case "right":
                position.column++;
                break;
            case "left":
                position.column--;
                break;
        }
        if (position.row === 0 && direction === 'up'
            || position.row === size - 1 && direction === 'down'
            || position.column === 0 && direction === 'left'
            || position.column === size - 1 && direction === 'right') {

            direction = changeDirection(position, size, direction);
        }
        i++;
    }
    return {
        field: newField,
        answer: newAnswer,
    }
}
