import React, {useEffect, useState} from 'react';
import './ChooseTranslatePage.css'
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {IChapterTaskWord, IChapterTaskWordVariant} from "../../../interfaces/chapters.interface";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {fetchWordsForTask} from "../../../redux/actions/words.actions";
import {shuffle} from "../../../utilities";
import {useAppDispatch} from "../../../hooks/redux";

interface IStateProps {
    words: IChapterTaskWord[];
}

type Answer = 'correct' | 'incorrect' | null;

const Card = ({data, onClick, answer} : {data: IChapterTaskWordVariant; onClick: any; answer: 'correct' | 'incorrect' | null}) => {
    return (<div className={classNames('card', 'unselectable', {
        card_incorrect: answer === 'incorrect',
        card_correct: answer === 'correct',
    })} onClick={onClick}>
        {data.wordEn}
    </div>)
}

const NUMBER_OF_VARIANTS = 4;

export const ChooseTranslatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {state}: {state: IStateProps} = location;

    const [words, setWords] = useState(state.words);
    const [activeVariant, setActiveVariant] = useState(0);
    const [answer, setAnswer] = useState<{id: number; answer: Answer} | null>(null);
    useEffect(() => {
        fetchWordsForTask({count: words.length * NUMBER_OF_VARIANTS}).then((newWords) => {
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
        })
    }, [])

    return (<div className={'translate-card-container'} >
        <button onClick={() => navigate(-1)} className={'back-button'}>
            Назад
        </button>
        <span style={{fontSize: 24, marginBottom: 20}}>
             {state.words[activeVariant].wordRu}
        </span>
        {words[activeVariant].variants.map((item) => {
            return (<Card key={item.id}
                          answer={item.id === answer?.id ? answer.answer : null}
                          data={item}
                          onClick={() => {
                const answer = item.correct ? 'correct' : 'incorrect';
                setAnswer({id: item.id, answer});
                setTimeout(() => {
                    setActiveVariant(activeVariant + 1);
                    setAnswer(null);
                }, 500)
            }}/>)
        })}
    </div>)
}
