import React, {useState} from 'react';
import './ChooseTranslatePage.css'
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {IChapterTaskWord, IChapterTaskWordVariant} from "../../../interfaces/chapters.interface";
import classNames from "classnames";

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

export const ChooseTranslatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state}: {state: IStateProps} = location;

    const [activeVariant, setActiveVariant] = useState(0);
    const [answer, setAnswer] = useState<{id: number; answer: Answer} | null>(null);

    return (<div className={'translate-card-container'} >
        <button onClick={() => navigate(-1)} className={'back-button'}>
            Назад
        </button>
        <span style={{fontSize: 24, marginBottom: 20}}>
             {state.words[activeVariant].wordRu}
        </span>
        {state.words[activeVariant].variants.map((item) => {
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
