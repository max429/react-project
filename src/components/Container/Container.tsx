import React, {FC, useState} from 'react';
import classNames from "classnames";
import {ProgressBar} from "@/components/ProgressBar/ProgressBar";
import ARROW_BACK from "@/images/arrow_back.png";
import {useNavigate} from "react-router-dom";
import './Container.css';
import {Modal} from "@/components/Modal/Modal";
import {Button} from "@/components/Button/Button";

interface IProps {
    progressBar?: {
        data: boolean[];
        length: number;
    };
    children: any;
    classes?: string | string[];
}

export const TaskContainer: FC<IProps> = ({children, classes, progressBar}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={'task-container'}>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className={'task-container__modal-button-text'}>
                    Вы действительно хотите выйти?
                </div>
                <div className={'task-container__modal-button-container'}>
                    <Button className={'task-container__modal-button'} text={'Нет'} onClick={() => setModalVisible(false)}/>
                    <Button className={'task-container__modal-button'} text={'Да'} onClick={() => navigate(-1)}/>
                </div>
            </Modal>
        {!!progressBar && <div className={'task-container-header'}>
            <div onClick={() => setModalVisible(true)} className={'task-container-header__back-button'}>
                <img alt={'Назад'} src={ARROW_BACK}/>
            </div>
            <ProgressBar
                data={progressBar.data}
                length={progressBar.length}/>
        </div>}
        <div className={classNames('task-container-content', classes)}>
            {children}
        </div>

    </div>)
}
