import React, {useEffect, useState} from 'react';
import './ChooseTranslatePage.css'
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {IChapterTaskWord, IChapterTaskWordVariant} from "@/interfaces/chapters.interface";
import classNames from "classnames";
import {fetchWordsForTask} from "@/redux/actions/words.actions";
import {shuffle} from "@/utils/array";
import {ProgressBar} from "@/components/ProgressBar/ProgressBar";
import ARROW_BACK from '../../../images/arrow_back.png';
import {TaskContainer} from "@/components/Container/Container";
import {Button} from "@/components/Button/Button";

interface IStateProps {
    words: IChapterTaskWord[];
}

type Answer = 'correct' | 'incorrect' | null;

const Card = ({text, onClick, answer, last, disabled} : {text: string; onClick: any; answer: 'correct' | 'incorrect' | null; last: boolean; disabled?: boolean}) => {
    return (<button className={classNames('card', 'unselectable', {
        card_incorrect: answer === 'incorrect',
        card_correct: answer === 'correct',
        'card_no-margin-bottom': last,
    })} onClick={onClick} disabled={disabled}>
        {text}
    </button>)
}

const NUMBER_OF_VARIANTS = 4;

export const ChooseTranslatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state}: {state: IStateProps} = location;

    const [showFinalResult, setShowFinalResult] = useState(false);

    const [words, setWords] = useState(state.words);
    const [activeVariant, setActiveVariant] = useState(0);
    const [answers, setAnswers] = useState<{id: number; answer: Answer}[]>([]);
    const [languageMode, setLanguageMode] = useState(0);
    const guessedWordLanguage = languageMode === 1 ? 'wordRu' : 'wordEn';
    const answerWordLanguage = languageMode !== 1 ? 'wordRu' : 'wordEn';

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        fetchWordsForTask({count: words?.length * NUMBER_OF_VARIANTS}).then((newWords) => {
            const newLanguageMode = Math.round(Math.random());
            setWords(words.map((item) => {
                let id = 1;
                const variants = [{id, wordEn: item.wordEn, wordRu: item.wordRu, correct: true}];
               for (let i = 0; i < newWords.length && variants.length !== NUMBER_OF_VARIANTS; i++) {
                   if (!variants.some((item) => item.wordEn === newWords[i].wordEn)) {
                       id++;
                       variants.push({id, ...newWords[i], correct: false})
                       newWords.shift();
                       i--;
                   }
               }
                return {...item, variants: shuffle(variants)}
            }))
            setLanguageMode(newLanguageMode);
        })
    }, []);

    function onCardClick(item: IChapterTaskWordVariant) {
        const answer = item.correct ? 'correct' : 'incorrect';
        setAnswers(answers.concat({id: item.id, answer}))
        setTimeout(() => {
            if (activeVariant < words.length - 1) {
                setActiveVariant(activeVariant + 1);
            } else {
                setShowFinalResult(true);
            }
        }, 500)
    }

    return (!showFinalResult ? <div className={classNames('translate-card-container', {
        'fade-out': answers.length === words?.length,
        'fade-in': answers.length === 0,
    })}>
        <div className={'translate-card-header'}>
            <div onClick={goBack} className={'translate-card-header__back-button'}>
                <img alt={'Назад'} src={ARROW_BACK}/>
            </div>
            <ProgressBar
                data={answers.map((item) => item.answer === 'correct')}
                length={words.length}/>
        </div>
        <div className={classNames('translate-card-main', {
            'fade-out': answers.length !== activeVariant,
            'fade-in': answers.length === activeVariant,
        })}>
              <span className={'translate-card-main__text'}>
                    {state.words[activeVariant][guessedWordLanguage]}
              </span>
        </div>
        <div className={classNames('translate-card-footer', {
            'fade-out': answers.length !== activeVariant,
            'fade-in': answers.length === activeVariant,
        })}>
            {words[activeVariant].variants?.map((item, index) => {
                const answer = answers[activeVariant];
                return (<Card key={item.id}
                              disabled={answers.length - 1 === activeVariant}
                              answer={item.id === answer?.id ? answer.answer : null}
                              text={item[answerWordLanguage]}
                              last={words[activeVariant].variants.length - 1 === index}
                              onClick={() => onCardClick(item)}/>)
            })}
        </div>
      {/* <Modal visible={modalVisible} setVisible={setModalVisible} onClose={() => setTimeout(() => goBack(), 200)}>
            Правильные ответы: {`${answers.reduce((accumulator , currentValue) => accumulator + Number(currentValue.answer === 'correct'), 0)}/${answers.length}`}
        </Modal>*/}
    </div> : <TaskContainer classes={['fade-in']}>
            <div>
                Задание завершено
            </div>
            Правильные ответы:
            {` ${answers.reduce((accumulator , currentValue) => accumulator + Number(currentValue.answer === 'correct'), 0)}/${answers.length}`}
        <div className={'translate-card-button-container'}>
            <Button text={'Повторить'}
                    className={'translate-card-button-container__left-button'}
                    onClick={() => {
                        setShowFinalResult(false);
                        setAnswers([]);
                        setActiveVariant(0);
            }}/>
            <Button text={'Продолжить'} onClick={goBack}/>
        </div>
    </TaskContainer>)
}
