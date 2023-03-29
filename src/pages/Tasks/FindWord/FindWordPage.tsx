import React, {FC, useEffect, useState} from "react";
import classNames from "classnames";
import {Loading} from "@/components/Loading/Loading";
import {TaskContainer} from "@/components/Container/Container";
import {R} from "@/resources/R";
import {FindWordLetterWrapper} from "./parts/FindWordLetterWrapper";
import {Button} from "@/components/Button/Button";
import {initializeField} from "./helpers";
import './FindWordPage.css';

export interface ILetter {
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

export type ResultType = 'correct' | 'incorrect' | null;

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
    const [answer, setAnswer] = useState<ILetter[]>([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [result, setResult] = useState<ResultType>(null);

    const initialize = () => {
        const {field, answer} = initializeField(alphabet, answerWord);
        setField(field);
        setAnswer(answer);
    }

    useEffect(initialize, [])

    useEffect(() => {
        if (selectedLetters.length === answerWord.length && !result) {
            validation();
        }
    }, [selectedLetters])

    if (!field) return <Loading/>;

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
            {answerField.map((_, index) =>
                 <div className={classNames(
                        'answer-field-item', {
                            'answer-field__item_correct': result === 'correct',
                            'answer-field__item_incorrect': result === 'incorrect'
                        })}
                    key={index}
                >
                    {selectedLetters[index]?.letter}
                </div>
            )}
        </div>

        <div onMouseLeave={() => {setMouseDown(false)}}>
            {field.map((row, rowIndex) => {
                return (<div  key={rowIndex} className={'field-row'}>

                    {(row.map((column, columnIndex) =>
                        <FindWordLetterWrapper
                            key={column.id}
                            handleSelection={handleSelection}
                            mouseDown={mouseDown}
                            setMouseDown={setMouseDown}
                            rowIndex={rowIndex}
                            column={{
                                data: column,
                                index: columnIndex
                            }}
                            answerLetters={result === 'incorrect' ? answer : selectedLetters}
                            result={result}
                        />
                    ))}

                </div>)
            })}
        </div>

        <Button text={'Сбросить'} onClick={() => {
            initialize();
            setSelectedLetters([]);
            setResult(null);
        }}/>
    </TaskContainer>
}
