import React, {useState} from 'react';
import './TrainingCardsPage.css';
import {TaskContainer} from "@/components/Container/Container";
import {useLocation, useNavigate} from "react-router-dom";
import {IChapterTaskWord} from "@/interfaces/chapters.interface";
import {Card} from "@/pages/Tasks/parts/Card";

export const TrainingCardsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {words}: { words: IChapterTaskWord[]} = location.state;
    const [activeWord, setActiveWord] = useState(0);
    const [languageMode] = useState<0 | 1>(Math.round(Math.random()) as 0 | 1);

    return (<TaskContainer>
        <Card data={words[activeWord]} languageMode={languageMode} cardMode={'training'} action={() => {
            if (words.length - 1 === activeWord) {
                navigate(-1);
            } else {
                setActiveWord(activeWord + 1);
            }
        }}/>
    </TaskContainer>)
}
