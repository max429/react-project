import React, {FC} from 'react';
import './Modal.css';
import classNames from "classnames";

interface IProps {
    visible: boolean;
    setVisible: (active: boolean) => void;
    children: any;
    onClose?: () => void;
}

export const Modal: FC<IProps> = ({visible, setVisible, children, onClose}) => {
    return <div
        className={classNames('modal', {
         modal_visible: visible})}
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
            {children}
        </div>
    </div>
}
