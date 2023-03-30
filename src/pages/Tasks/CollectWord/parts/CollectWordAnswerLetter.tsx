import React, {FC} from 'react';
import classNames from "classnames";

interface IProps {
    data: {
        index: number;
        value: string | null;
        result?: 'correct' | 'incorrect' | null
    };
    index: number;
    draggedOver: number;
    onDragExit: () => void;
    onDrop: () => void;
    onDragLeave: () => void;
    onDragEnter: () => void;
    onClick: () => void;
}


export const CollectWordAnswerLetter: FC<IProps> =
    ({data, draggedOver, index, onDragEnter, onDragExit, onDragLeave, onClick, onDrop}) => {
    return (
        <div
            draggable
            className={classNames('answer-field__item', {
                'answer-field__item_filled': !!data.value,
                'answer-field__item_correct': data.result === 'correct',
                'answer-field__item_incorrect': data.result === 'incorrect',
                'answer-field__item_drag-over': draggedOver === index && !data.value,
            })}
            onDragExit={onDragExit}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={(e) => {
                e.dataTransfer.dropEffect = 'move';
                e.preventDefault();
                e.stopPropagation();
            }}
            onClick={onClick}
        >
            {data?.value}
        </div>
    )
}
