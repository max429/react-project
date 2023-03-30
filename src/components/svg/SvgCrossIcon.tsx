import React, {FC} from 'react';

interface IProps {
    color?: string;
    size?: number;
}

export const SvgCrossIcon: FC<IProps> = ({color = 'white', size = 20}) => {
    return ( <svg height={size} viewBox="0 96 960 960" width={size} fill={color}>
        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
    </svg>)
}
