import React, {FC, useEffect, useState} from 'react';
import './Card.css';
import {speak, utterance} from "../../../utils/speech";
import classNames from "classnames";
import {SpeakerIcon} from "../../../components/SpeakerIcon/SpeakerIcon";

interface IProps {
    languageMode?: 0 | 1;
    cardMode?: 'learning' | 'training';
    action?: () => void;
    data: {
        imgLink: string;
        wordRu: string;
        wordEn: string;
    }
}

export const Card: FC<IProps> = ({languageMode = 0, data, cardMode = 'learning', action}) => {
    const {wordEn, wordRu, imgLink} = data;
    const firstWord = languageMode === 0 ? wordRu : wordEn;
    const secondWord = languageMode === 0 ? wordEn : wordRu;
    const [showSecondWord, setShowSecondWord] = useState(cardMode === 'learning');
    const [enableVoiceAnimation, setEnableVoiceAnimation] = useState(false);

    useEffect(() => {
        setShowSecondWord(cardMode === 'learning');
        const handler = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                speak(secondWord, languageMode ? 'ru-RU' : 'us-US');
            }
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        }
    }, [data])

    useEffect(() => {
        const voiceHandler = (e: SpeechSynthesisEvent) => {
            console.log(e.type);
            if (cardMode === 'learning') {
                if (e.type === 'start'){
                    setEnableVoiceAnimation(true);
                } else if (e.type === 'end' || e.type === 'error'){
                    setEnableVoiceAnimation(false);
                }
            }
        }
        utterance.addEventListener('start', voiceHandler);
        utterance.addEventListener('end', voiceHandler);
        utterance.addEventListener('error', voiceHandler);
        return () => {
            utterance.removeEventListener('start', voiceHandler);
            utterance.removeEventListener('end', voiceHandler);
            utterance.removeEventListener('error', voiceHandler);
        }
    }, [enableVoiceAnimation])

    return (
        <div onClick={() => {
            if (!showSecondWord) {
                setShowSecondWord(true);
                speak(secondWord, languageMode ? 'ru-RU' : 'us-US');
            } else {
                action && action();
            }
        }} className={classNames('word-card', {
            'word-card_training': cardMode === 'training'
        })}>
            <img src={imgLink} className={'word-card__image'} alt={'Изображение'}/>
            <div className={'word-card__first-word'}>
                {firstWord}
            </div>
            <div className={classNames('word-card__second-word-container', {
                'word-card__second-word-container_active': cardMode === 'learning'
            })} onClick={(e) => {
                if (cardMode === 'learning') {
                    speak(secondWord, languageMode ? 'ru-RU' : 'us-US')
                }
            }}>
                {showSecondWord ? secondWord : '?'}
                {cardMode === 'learning' && <div  className={'word-card__sound-button'}>
                    <SpeakerIcon animationEnabled={enableVoiceAnimation}/>
                </div>}
            </div>
        </div>
    )
}
