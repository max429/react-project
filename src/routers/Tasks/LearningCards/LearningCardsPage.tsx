import React, {useEffect, useState} from 'react';
import VOLUME_UP from '../../../images/volume_up.png'
import {useLocation} from "react-router-dom";
import {IChapterTaskWord} from "../../../interfaces/chapters.interface";
import './LearningCardsPage.css'
import {R} from "../../../resources/R";


export const LearningCardsPage = () => {
    const location = useLocation();
    const {words}: { words: IChapterTaskWord[]} = location.state;
    const [activeWord, setActiveWord] = useState(0);
    useEffect(() => {
    }, [])
    return (<div className={'learning-cards-container'}>
        <img src={R.images.family} className={'learning-cards-container__word-image'} alt={'Изображение'}/>
        <div className={'learning-cards-container__word-ru'}>
            {words[activeWord].wordRu}
        </div>
        <div className={'learning-cards-container__word-en-container'}>
            {words[activeWord].wordEn}
            <button onClick={() => {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(words[0].wordEn);
                synth.speak(utterance)
            }} className={'learning-cards-container__sound-button'}>
                <img src={VOLUME_UP}  alt={'Озвучить'} className={'learning-cards-container__sound-button-img'}/>
            </button>
        </div>
    </div>)
}
