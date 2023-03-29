import React, {FC, MouseEventHandler} from 'react';
import classNames from "classnames";
import {R} from "../../../../resources/R";
import {ResultType} from "../FindWordPage";

export type LineDirection = 'left' | 'right' | 'down' | 'up';

const ArrowLine: FC<{direction: LineDirection}> = ({direction}) => {
    return (<img alt={'Стрелка'} src={R.images.arrow_back}
                 className={classNames('arrow-line', 'arrow-line_direction_' + direction)}/>)
}
interface IProps {
    isHasLine: boolean;
    direction: LineDirection;
    selectedIndex: number;
    result: ResultType;
    column: any;
    onMouseUp: MouseEventHandler;
    onMouseEnter: MouseEventHandler;
    onMouseDown: MouseEventHandler;
}

export const FindWordLetter: FC<IProps> =
    ({isHasLine, direction,
         selectedIndex, result, column, onMouseDown, onMouseEnter, onMouseUp}) => {
    return (
        <button
            disabled={!!result}
            className={classNames('field-column', {
            'field-column_selected': selectedIndex !== -1,
            'field-column_incorrect': selectedIndex !== -1 && result === 'incorrect',
            'field-column_disabled': !!result,
        })}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}>
            {isHasLine && <ArrowLine direction={direction}/>}
            {column.letter}
        </button>
    )
}
