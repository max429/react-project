import React, {useEffect, useState} from 'react';
import VOLUME_UP from '../../../images/volume_up.png'
import {useLocation} from "react-router-dom";
import {IChapterTaskWord} from "../../../interfaces/chapters.interface";
import './LearningCardsPage.css'
import {R} from "../../../resources/R";
import {TaskContainer} from "../../../components/Container/Container";

export const LearningCardsPage = () => {
    const location = useLocation();
    const {words}: { words: IChapterTaskWord[]} = location.state;
    const [activeWord, setActiveWord] = useState(0);
    useEffect(() => {
    }, [])
    return (
        <TaskContainer>
            {activeWord !== 0 && <button
                className={'learning-cards-container__next-button learning-cards-container__next-button_position_left'}
                onClick={() => {
                setActiveWord(activeWord - 1)
            }}>
                <img alt={'Назад'} src={R.images.arrow_back} className={'learning-cards-container__next-button-image'} draggable={false}/>
            </button>}
            {activeWord !== words.length - 1 &&
                <button className={'learning-cards-container__next-button learning-cards-container__next-button_position_right'} onClick={() => {
                setActiveWord(activeWord + 1)
            }}>
                <img alt={'Дальше'} draggable={false} src={R.images.arrow_back} className={'learning-cards-container__next-button-image learning-cards-container__next-button-image_rotate'}/>
            </button>}
        <img src={words[activeWord].imgLink} className={'learning-cards-container__word-image'} alt={'Изображение'}/>
        <div className={'learning-cards-container__word-ru'}>
            {words[activeWord].wordRu}
        </div>
        <div className={'learning-cards-container__word-en-container'}>
            {words[activeWord].wordEn}
            <button onClick={() => {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(words[activeWord].wordEn);
                synth.speak(utterance)
            }} className={'learning-cards-container__sound-button'}>
                <img src={VOLUME_UP}  alt={'Озвучить'} className={'learning-cards-container__sound-button-image'} draggable={false}/>
            </button>
        </div>
    </TaskContainer>)
}
