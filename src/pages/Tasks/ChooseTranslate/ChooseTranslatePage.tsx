import React, {useEffect, useState} from 'react';
import './ChooseTranslatePage.css'
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {IChapterTaskWord, IChapterTaskWordVariant} from "../../../interfaces/chapters.interface";
import classNames from "classnames";
import {fetchWordsForTask} from "../../../redux/actions/words.actions";
import {shuffle} from "../../../utilities";
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import ARROW_BACK from '../../../images/arrow_back.png';
import {Modal} from "../../../components/Modal/Modal";

interface IStateProps {
    words: IChapterTaskWord[];
}

type Answer = 'correct' | 'incorrect' | null;

const Card = ({data, onClick, answer, last} : {data: IChapterTaskWordVariant; onClick: any; answer: 'correct' | 'incorrect' | null; last: boolean}) => {
    return (<div className={classNames('card', 'unselectable', {
        card_incorrect: answer === 'incorrect',
        card_correct: answer === 'correct',
        'card_no-margin-bottom': last,
    })} onClick={onClick}>
        {data.wordEn}
    </div>)
}

const NUMBER_OF_VARIANTS = 4;

export const ChooseTranslatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state}: {state: IStateProps} = location;

    const [modalVisible, setModalVisible] = useState(false);

    const [words, setWords] = useState(state.words);
    const [activeVariant, setActiveVariant] = useState(0);
    const [answers, setAnswers] = useState<{id: number; answer: Answer}[]>([]);

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        fetchWordsForTask({count: words?.length * NUMBER_OF_VARIANTS}).then((newWords) => {
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
    }, []);

    return (<div className={'translate-card-container'}>
        <div className={'translate-card-header'}>
            <div onClick={goBack} className={'translate-card-header__back-button'}>
                <img alt={'Назад'} src={ARROW_BACK}/>
            </div>
            <ProgressBar
                data={answers.map((item) => item.answer === 'correct')}
                length={words.length}/>
        </div>
        <div className={'translate-card-main'}>
              <span className={'translate-card-main__text'}>
                    {state.words[activeVariant].wordRu}
              </span>
        </div>
        <div className={'translate-card-footer'}>
            {words[activeVariant].variants?.map((item, index) => {
                const answer = answers[activeVariant];
                return (<Card key={item.id}
                              answer={item.id === answer?.id ? answer.answer : null}
                              data={item}
                              last={words[activeVariant].variants.length - 1 === index}
                              onClick={() => {
                                  const answer = item.correct ? 'correct' : 'incorrect';
                                  setAnswers(answers.concat({id: item.id, answer}))
                                  setTimeout(() => {
                                      if (activeVariant < words.length - 1) {
                                          setActiveVariant(activeVariant + 1);
                                      } else {
                                          setModalVisible(true);
                                      }
                                  }, 500)
                              }}/>)
            })}
        </div>
        <Modal visible={modalVisible} setVisible={setModalVisible} onClose={() => setTimeout(() => goBack(), 200)}>
            Правильные ответы: {`${answers.reduce((accumulator , currentValue) => accumulator + Number(currentValue.answer === 'correct'), 0)}/${answers.length}`}
        </Modal>
    </div>)
}
