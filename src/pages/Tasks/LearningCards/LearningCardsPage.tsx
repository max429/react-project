import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {useLocation} from "react-router-dom";
import {IChapterTaskWord} from "@/interfaces/chapters.interface";
import {R} from "@/resources/R";
import {TaskContainer} from "@/components/Container/Container";
import {Card} from "../parts/Card";
import {cancelSpeak} from "@/utils/speech";
import './LearningCardsPage.css';

export const LearningCardsPage = () => {
    const location = useLocation();
    const {words}: { words: IChapterTaskWord[]} = location.state;
    const [activeWord, setActiveWord] = useState(0);
    const [languageMode] = useState<0 | 1>(Math.round(Math.random()) as 0 | 1);

    const [rightButtonActive, setRightButtonActive] = useState(false);
    const [leftButtonActive, setLeftButtonActive] = useState(false);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.code === 'ArrowRight' || e.code === 'Enter') {
                setRightButtonActive(true);
                goRight();
                setTimeout(() => {
                    setRightButtonActive(false);
                }, 200);

            } else if (e.code === 'ArrowLeft') {
                setLeftButtonActive(true);
               goLeft();
                setTimeout(() => {
                    setLeftButtonActive(false);
                }, 200);
            }
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        }
    }, [activeWord])

    const goRight = () => {
        if (activeWord < words.length - 1) {
            cancelSpeak();
            setActiveWord(activeWord + 1);
        }
    }

    const goLeft = () => {
        if (activeWord > 0) {
            cancelSpeak();
            setActiveWord(activeWord - 1)
        }
    }

    return (
        <TaskContainer classes={'learning-cards-container'}>
            <button
                className={classNames('learning-cards-container__next-button', {
                    'learning-cards-container__next-button_hide': activeWord === 0,
                    'learning-cards-container__next-button_selection': leftButtonActive
                })}
                onClick={goLeft}>
                <img alt={'Назад'} src={R.images.arrow_back} className={'learning-cards-container__next-button-image'} draggable={false}/>
            </button>
            <Card cardMode={'learning'} data={words[activeWord]} languageMode={languageMode}/>
            <button className={classNames('learning-cards-container__next-button', {
                    'learning-cards-container__next-button_hide': activeWord === words.length - 1,
                     'learning-cards-container__next-button_selection': rightButtonActive
                })} onClick={goRight}>
                <img alt={'Далее'} draggable={false} src={R.images.arrow_back} className={'learning-cards-container__next-button-image learning-cards-container__next-button-image_rotate'}/>
            </button>
    </TaskContainer>)
}
