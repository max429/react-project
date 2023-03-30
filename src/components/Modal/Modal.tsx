import React, {FC} from 'react';
import classNames from "classnames";
import './Modal.css';
import {SvgCrossIcon} from "@/components/svg/SvgCrossIcon";

interface IProps {
    visible: boolean;
    setVisible: (active: boolean) => void;
    children: any;
    onClose?: () => void;
}

export const Modal: FC<IProps> = ({visible, setVisible, children, onClose}) => {
    return <div
        className={classNames('modal', {modal_visible: visible})}
        onClick={() => {
            setVisible(false)
            if (onClose) {
                onClose();
            }
        }
    }>

        <div className={classNames('modal__content', {
            'modal__content_visible': visible
        })} onClick={(event) => event.stopPropagation()}>
            <div className={'modal__close-button'} onClick={() => setVisible(false)}>
                <SvgCrossIcon color={'black'}/>
            </div>
            {children}
        </div>
    </div>
}
