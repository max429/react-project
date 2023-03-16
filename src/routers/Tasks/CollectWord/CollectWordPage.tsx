import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {IChapterTaskWord} from "../../../interfaces/chapters.interface";
import './CollectWordPage.css';
import {shuffle} from "../../../utilities";
import classNames from "classnames";

interface IStateProps {
    words: IChapterTaskWord[];
}

export const CollectWordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {state}: {state: IStateProps} = location;
    const [currentWord, setCurrentWord] = useState(0);
    const {wordEn, wordRu} = state.words[currentWord];

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
            if (event.key === 'Backspace' && answerIndex > 0) {
                letters[answer[answerIndex - 1].index] = answer[answerIndex - 1];
                answer[answerIndex - 1] = {index: 0, value: null};
                setAnswer([...answer]);
            } else if (letterIndex !== -1) {

                answer[answerIndex] = {...letters[letterIndex], result: null};
                letters[letterIndex] = {...letters[letterIndex], value: null};
                setAnswer([...answer]);
                if (answer.every((item) => !!item.value)) {
                    validation();
                }
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

    return (<div className={'collect-word'}>
        <span className={'word'}>
            {wordRu}
        </span>
        <div className={'answer-field'}>
            {answer.map((letter, index) => {
                return <button disabled={letter.result === 'correct' || !answer[index].value} className={classNames('answer-field__item', {
                    'answer-field__item_filled': !!answer[index].value,
                    'answer-field__item_correct': letter.result === 'correct',
                    'answer-field__item_incorrect': letter.result === 'incorrect'
                })} key={index} onClick={() => {
                    letters[answer[index].index] = answer[index];
                    answer[index] = {value: null, index: 0};
                    setLetters([...letters]);
                }}>
                    {answer[index]?.value}
                </button>
            })}
        </div>
        <div className={'letters'}>
            {letters.map((letter, index) => {
                return <div className={'letters__content'} key={index}>
                    {!!letter && <div className={'letters__content-letter'} key={letter.index} onClick={() => {
                        const letterIndex = answer.findIndex((item) => !item.value);
                        answer[letterIndex] = {...letter, result: null};
                        letters[index] = {...letters[index], value: null};
                        setAnswer([...answer]);
                        if (answer.every((item) => !!item.value)) {
                            validation();
                        }
                    }}>
                        <span>
                            {letter.value}
                        </span>
                    </div>}
                </div>
            })}
        </div>
    </div>)
}
