import React, {FC} from 'react';
import classNames from "classnames";

interface IProps {
      data: {
          index: number;
          value: string | null;
          result?: 'correct' | 'incorrect' | null
      };
      index: number;
      hideElement: number;
      onDragStart: (e: any) => void;
      onDragEnd: () => void;
      onClick: () => void;
}

export const CollectWordLetter: FC<IProps> = ({data, hideElement, index, onClick, onDragEnd, onDragStart}) => {
    return (
        <div
            className={classNames('letters__content', {
                'letters__content_invisible': !data?.value || hideElement === index
            })}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggable
        >
            {!!data &&
                <div className={'letters__content-letter'} onClick={onClick}>
                    <span>
                        {data.value}
                    </span>
            </div>}
        </div>
    )
}
