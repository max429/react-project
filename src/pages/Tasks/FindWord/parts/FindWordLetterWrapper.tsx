import React, {FC} from 'react';
import {FindWordLetter, LineDirection} from "./FindWordLetter";
import {ILetter, ResultType} from "../FindWordPage";

interface IProps {
    answerLetters: ILetter[];
    mouseDown: boolean;
    setMouseDown: (mouseDown: boolean) => void;
    handleSelection: any;
    result: ResultType;
    column: {data: ILetter, index: number};
    rowIndex: number;
}

export const FindWordLetterWrapper: FC<IProps> =
    ({column, answerLetters, setMouseDown, handleSelection, mouseDown, result, rowIndex}) => {
    const selectedIndex = answerLetters.findIndex((selLetter) => selLetter.id === column.data.id);
    const isHasLine = selectedIndex !== -1 && selectedIndex !== answerLetters.length - 1;
    let direction: LineDirection = 'left';
    if (isHasLine) {
        if (answerLetters[selectedIndex + 1].position.row < answerLetters[selectedIndex]?.position.row) {
            direction = 'up';
        } else if (answerLetters[selectedIndex + 1]?.position.row > answerLetters[selectedIndex].position.row) {
            direction = 'down';
        } else if (answerLetters[selectedIndex + 1]?.position.column > answerLetters[selectedIndex]?.position.column) {
            direction = 'right';
        }
    }

    function onMouseDown() {
        console.log('onMouseDown');
        setMouseDown(true);
        handleSelection(selectedIndex, column.data, rowIndex, column.index);
    }

    function onMouseUp() {
        setMouseDown(false);
    }

    function onMouseEnter() {
        if (mouseDown) {
            if (selectedIndex !== -1 && isHasLine) {
                handleSelection(selectedIndex + 1, column.data,
                    answerLetters[selectedIndex + 1].position.row, answerLetters[selectedIndex + 1].position.column);
            } else {
                handleSelection(selectedIndex, column.data, rowIndex, column.index);
            }
        }
    }

    return <FindWordLetter
        isHasLine={isHasLine}
        direction={direction}
        selectedIndex={selectedIndex}
        result={result}
        column={column.data}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
    />
}
