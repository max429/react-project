import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {IChapterTaskWord} from "@/interfaces/chapters.interface";
import './CollectWordPage.css';
import {shuffle} from "@/utils/array";
import classNames from "classnames";
import {TaskContainer} from "@/components/Container/Container";
import { Tooltip } from 'react-tooltip'
import {R} from "@/resources/R";
import {CollectWordAnswerLetter} from "@/pages/Tasks/CollectWord/parts/CollectWordAnswerLetter";
import {CollectWordLetter} from "@/pages/Tasks/CollectWord/parts/CollectWordLetter";

interface IStateProps {
    words: IChapterTaskWord[];
}

export const CollectWordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {state}: {state: IStateProps} = location;
    const [currentWord, setCurrentWord] = useState(0);

    const [hideElement, setHideElement] = useState(-1);

    const [draggedOver, setDraggedOver] = useState(-1);

    const letterPlace = useRef<number>(-1);


    const {wordEn, wordRu} = state.words[currentWord] || {wordEn: '', wordRu: ''};

    const [answer, setAnswer] = useState<{index: number;
        value: string | null;
        result?: 'correct' | 'incorrect' | null}[]>([]);
    const [letters, setLetters] = useState<{index: number; value: string | null}[]>([]);

    const getAnswerInitialData = () => {
        const array = Array.apply(null, Array(wordEn.length));
        return array.map(() => ({
            index: 0,
            value: null,
        }))
    }

    const getLettersInitialData = () => {
        return shuffle(wordEn.split('')).map((letter, index) => {
            return {
                index,
                value: letter,
            }
        })
    }

    useEffect(() => {
        setLetters(getLettersInitialData());
        setAnswer(getAnswerInitialData())
    }, [currentWord]);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const letterIndex = letters.findIndex((item) => item.value === event.key);
            const answerIndex = answer.findIndex((item) => !item.value);
            const answerDeleteIndex = answer.findLastIndex((item) => !!item.value && !item.result);
            if (event.key === 'Backspace' && answerDeleteIndex !== -1) {
                deleteAnswerLetter(answerDeleteIndex);
                letters[answer[answerDeleteIndex].index] = answer[answerDeleteIndex];
                answer[answerDeleteIndex] = {index: 0, value: null};
                setAnswer([...answer]);
            } else if (letterIndex !== -1) {
                addAnswerLetter(answerIndex, letterIndex);
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [letters, answer])

    const validation = () => {
        let nextStep = true;
        const newLetters = [...letters];
        const newAnswerLetters = [...answer];
        answer.forEach((letter, i) => {
            if (wordEn[i] === letter.value) {
                answer[i].result = 'correct';
                newAnswerLetters[i].result = 'correct';
            } else {
                nextStep = false;
                answer[i].result = 'incorrect';
                newLetters[answer[i].index] = answer[i];
                newAnswerLetters[i] = {value: null, index: 0};
            }
        })
        if (nextStep) {
            setTimeout(() => {
                if (currentWord >= state.words.length - 1) {
                    navigate(-1)
                } else {
                    setCurrentWord(currentWord + 1);
                }
            }, 500)
        } else {
            setAnswer([...answer]);
            setTimeout(() => {
                setLetters(newLetters);
                setAnswer(newAnswerLetters);
            }, 500);
        }
    }

    const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        letterPlace.current = position;
        setTimeout(() => {
            setHideElement(position);
        })
    }

    const addAnswerLetter = (answerIndex: number, letterIndex: number) => {
        answer[answerIndex] = {...letters[letterIndex], result: null};
        letters[letterIndex] = {...letters[letterIndex], value: null};
        setAnswer([...answer]);
        if (answer.every((item) => !!item.value)) {
            validation();
        }
    }

    const deleteAnswerLetter = (index: number) => {
        letters[answer[index].index] = answer[index];
        answer[index] = {value: null, index: 0};
        setLetters([...letters]);
    }

    return (<TaskContainer progressBar={{
        length: state.words.length,
        data: []
    }}>
        <div className={classNames('word')} >
            <div>
                {wordRu}
            </div>
            <img alt={'Помощь'} src={R.images.help} className={classNames('my-anchor-element', 'word-image ')}/>
        </div>

        <div className={'answer-field'}>
            {answer.map((letter, index) => {
                return (
                    <CollectWordAnswerLetter
                        data={letter}
                        index={index}
                        draggedOver={draggedOver}
                        onDragExit={() => letterPlace.current = -1}
                        onDrop={() => {
                            if (!letter.value) {
                                setDraggedOver(-1);
                                addAnswerLetter(index, letterPlace.current);
                            }}
                        }
                        onDragLeave={() => setDraggedOver(-1)}
                        onDragEnter={() => setDraggedOver(index)}
                        onClick={() => {
                            if (!!answer[index].value && letter.result !== 'correct' ) {
                                deleteAnswerLetter(index)}
                        }}
                    />)
            })}
        </div>

        <div className={'letters'}>
            {letters.map((letter, index) => {
                return (
                    <CollectWordLetter
                        data={letter}
                        index={index}
                        hideElement={hideElement}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnd={() => setHideElement(-1)}
                        onClick={() => {
                            const answerIndex = answer.findIndex((item) => !item.value);
                            addAnswerLetter(answerIndex, index);
                        }}
                    />)
            })}
        </div>
        <Tooltip id="my-tooltip" openOnClick anchorSelect=".my-anchor-element">
            {wordEn}
        </Tooltip>
    </TaskContainer>)
}
