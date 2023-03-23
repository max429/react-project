import React, {FC, useEffect, useState} from "react";
import {Loading} from "../../../components/Loading/Loading";
import {TaskContainer} from "../../../components/Container/Container";
import './FindWordPage.css';
import classNames from "classnames";
import {R} from "../../../resources/R";

interface ILetter {
    letter: string | null;
    id: string;
    position: {
        row: number;
        column: number;
    };
    coordinates?: {
        x?: number;
        y?: number;
    }
}

type LineDirection = 'left' | 'right' | 'down' | 'up';

const Line: FC<{direction: LineDirection}> = ({direction}) => {
    let d = '';
    let style =  {};
    switch (direction) {
        case 'left':
            d = 'M8 5H2M4 3L2 5L4 7';
            style = {left: -15};
            break;
        case 'right':
            d = 'M2 5H8M6 3L8 5L6 7';
            style = {right: -15};
            break;
        case 'down':
            d = 'M5 2V8M3 6L5 8L7 6';
            style = {bottom: -15};
            break;
        case 'up':
            d = 'M5 8V2M3 4L5 2L7 4';
            style = {top: -15};
            break;
    }
    return (<svg width="25" height="25" style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
    }}>
        <svg viewBox="0 0 10 10" width={25} height={25}>
            <path d={d} stroke={'#000'} strokeWidth="1"/>
        </svg>
    </svg>)
}

export const FindWordPage = () => {
    const testData = {
        wordEn: 'family',
        wordRu: 'семья',
    }


    const answerWord = testData.wordEn;
    const translateWord = testData.wordRu;
    const alphabet = R.constants.englishAlphabet;

    const [field, setField] = useState<ILetter[][]>();
    const [answerField] = useState(Array.apply(null, Array(answerWord.length)));
    const [selectedLetters, setSelectedLetters] = useState<ILetter[]>([]);
    const [answer] = useState<ILetter[]>([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

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
        console.log('availableDirections', availableDirections);
        return availableDirections;
    }
    function changeDirection(position: {row: number; column: number}, size: number, oldDirection?: LineDirection): LineDirection {
        let directions: LineDirection[] = getAvailableDirections(position, size, oldDirection);
        return directions[Math.floor(Math.random() * (directions.length - 1))]
    }

    const initializeField = () => {
        const newField:ILetter[][]  = [];
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
        while (i < answerWord.length) {
            newField[position.row][position.column] =
                {...newField[position.row][position.column], letter: answerWord[i]}
            answer.push({...newField[position.row][position.column], letter: answerWord[i]})

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
        setField(newField);
    }

    useEffect(() => {
        initializeField();
    }, [])

    useEffect(() =>{
        if (selectedLetters.length === answerWord.length && !result) {
            validation();
        }
    }, [selectedLetters])

    if (!field) return <Loading/>

    const validation = () => {
        let answer = '';
        selectedLetters.forEach((item) => {
            answer += item.letter;
        })
        const isValid = answer === answerWord;
        setResult(isValid ? 'correct' : 'incorrect')
    }



    const handleSelection = (selectedIndex: number, item: ILetter, rowIndex: number, columnIndex: number) => {
        const lastSelectedLetter = selectedLetters.length ? selectedLetters[selectedLetters.length - 1] : null
        if (selectedIndex === -1) {
                if (!lastSelectedLetter || !!lastSelectedLetter && (
                    Math.abs(lastSelectedLetter.position.row - rowIndex) === 1 && lastSelectedLetter.position.column === columnIndex
                    || lastSelectedLetter.position.row === rowIndex && Math.abs(lastSelectedLetter.position.column - columnIndex) === 1)) {
                    const newSelectedLetters = selectedLetters.concat(item);
                    setSelectedLetters(newSelectedLetters);
                }
        } else {
            selectedLetters.splice(selectedIndex, selectedLetters.length);
            setSelectedLetters([...selectedLetters]);
        }
    }

    return <TaskContainer>
        <span className={'text'}>
            {translateWord}
        </span>
        <div className={'answer-field-container'}>
            {answerField.map((_, index) => {
                return <div className={classNames('answer-field-item', {
                   'answer-field__item_correct': result === 'correct',
                      'answer-field__item_incorrect': result === 'incorrect'
                })} key={index}>
                    {selectedLetters[index]?.letter}
                </div>
            })}
        </div>
        <div onMouseLeave={() => {setMouseDown(false)}}>
            {field.map((row, rowIndex) => {
                return (<div  key={rowIndex} className={'field-row'}>
                    {(row.map((column, columnIndex) => {
                        const letters = result === 'incorrect' ? answer : selectedLetters;
                        const selectedIndex = letters.findIndex((selLetter) => selLetter.id === column.id);
                        const isHasLine = selectedIndex !== -1 && selectedIndex !== letters.length - 1;
                        let direction: LineDirection = 'left';
                        if (isHasLine) {
                            if (letters[selectedIndex + 1].position.row < letters[selectedIndex]?.position.row) {
                                direction = 'up';
                            } else if (letters[selectedIndex + 1]?.position.row > letters[selectedIndex].position.row) {
                                direction = 'down';
                            } else if (letters[selectedIndex + 1]?.position.column > letters[selectedIndex]?.position.column) {
                                direction = 'right';
                            }
                        }
                        return <button ref={el => {
                            const data = el?.getBoundingClientRect();
                            field[rowIndex][columnIndex].coordinates = {
                                x: data?.x,
                                y: data?.y
                            }
                        }} disabled={!!result} className={classNames('field-column', {
                            'field-column_selected': selectedIndex !== -1,
                            'field-column_incorrect': selectedIndex !== -1 && result === 'incorrect',
                            'field-column_disabled': !!result,
                        })}
                                       onMouseUp={() => {
                                           setMouseDown(false)
                                       }}
                                       onMouseDown={() =>{
                                           handleSelection(selectedIndex, column, rowIndex, columnIndex);
                                           setMouseDown(true);
                                       }}
                                       onMouseEnter={() => {
                                           if (mouseDown) {
                                               if (selectedIndex !== -1 && isHasLine) {
                                                   handleSelection(selectedIndex + 1, column,
                                                       letters[selectedIndex + 1].position.row, letters[selectedIndex + 1].position.column);
                                               } else {
                                                   handleSelection(selectedIndex, column, rowIndex, columnIndex);
                                               }

                                           }
                                       }} key={column.id}>
                            {isHasLine && <Line direction={direction}/>}
                            {column.letter}
                        </button>
                    }))}
                </div>)
            })}
        </div>

    </TaskContainer>
}
