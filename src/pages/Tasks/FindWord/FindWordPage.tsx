import React, {FC, useEffect, useState} from "react";
import {Loading} from "../../../components/Loading/Loading";
import {TaskContainer} from "../../../components/Container/Container";
import './FindWordPage.css';
import classNames from "classnames";

interface ILetter {
    letter: string;
    id: string;
    position: {
        row: number;
        column: number;
    };
    coordinates?: {
        x?: number;
        y?: number;
    }
}

type LineDirection = 'left' | 'right' | 'down' | 'up';

const Line: FC<{direction: LineDirection}> = ({direction}) => {
    let d = '';
    let style =  {};
    switch (direction) {
        case 'left':
            d = 'M8 5H2M4 3L2 5L4 7';
            style = {left: -15};
            break;
        case 'right':
            d = 'M2 5H8M6 3L8 5L6 7';
            style = {right: -15};
            break;
        case 'down':
            d = 'M5 2V8M3 6L5 8L7 6';
            style = {bottom: -15};
            break;
        case 'up':
            d = 'M5 8V2M3 4L5 2L7 4';
            style = {top: -15};
            break;
    }
    return (<svg width="25" height="25" style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
    }}>
        <svg viewBox="0 0 10 10" width={25} height={25}>
            <path d={d} stroke={'#000'} strokeWidth="1"/>
        </svg>
    </svg>)
}

export const FindWordPage = () => {
    const testData = {
        wordEn: 'help',
        wordRu: 'помощь',
    }

    const [field, setField] = useState<ILetter[][]>();
    const [selectedLetters, setSelectedLetters] = useState<ILetter[]>([]);
    const [mouseDown, setMouseDown] = useState(false);



    function getAvailableDirections(position: {row: number; column: number}, size: number, oldDirection?: LineDirection):LineDirection[] {
        const availableDirections: LineDirection[] = [];
        const horizontal = !oldDirection || oldDirection === 'up' || oldDirection == 'down';
        const vertical = !oldDirection || oldDirection === 'left' || oldDirection === 'right';
        if (position.row !== 0 && vertical) {
            availableDirections.push('up');
        }
        if (position.row !== size - 1 && vertical) {
            availableDirections.push('down');
        }

        if (position.column !== size - 1 && horizontal) {
            availableDirections.push('right');
        }

        if (position.column !== 0 && horizontal) {
            availableDirections.push('left');
        }
        console.log('availableDirections', availableDirections);
        return availableDirections;
    }
    function changeDirection(position: {row: number; column: number}, size: number, oldDirection?: LineDirection): LineDirection {
        let directions: LineDirection[] = getAvailableDirections(position, size, oldDirection);
        return directions[Math.floor(Math.random() * (directions.length - 1))]
    }

    const initializeField = () => {
        const newField:ILetter[][]  = [];
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        const size = testData.wordEn.length;
        for (let i = 0; i < size; i ++) {
            newField.push([]);
            for (let j = 0; j < size; j++) {
                newField[i].push({
                    letter: alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
                    position: {
                        row: i,
                        column: j,
                    },
                    id: 'i' + i.toString() + 'j' +  j.toString()
                })
            }
        }
        let position = {row: Math.floor(Math.random() * (size - 1)),
            column: Math.floor(Math.random() * (size - 1))};
        let direction = changeDirection(position, size);
        let i = 0;
        while (i < testData.wordEn.length) {
            newField[position.row][position.column] =
                {...newField[position.row][position.column], letter: testData.wordEn[i]}

            switch (direction) {
                case "down":
                    position.row++;
                    break;
                case "up":
                    position.row--;
                    break;
                case "right":
                    position.column++;
                    break;
                case "left":
                    position.column--;
                    break;
            }
            if (position.row === 0 && direction === 'up'
                || position.row === size - 1 && direction === 'down'
                || position.column === 0 && direction === 'left'
                || position.column === size - 1 && direction === 'right') {

                direction = changeDirection(position, size, direction);
            }
            i++;
        }
        setField(newField);
    }

    console.log('selected', selectedLetters);

    useEffect(() => {
        initializeField();
    }, [])

    if (!field) return <Loading/>

    const handleSelection = (index: number, item: ILetter) => {
        if (index === -1) {
            setSelectedLetters(selectedLetters.concat(item));
        } else {
            selectedLetters.splice(index, 1);
            setSelectedLetters([...selectedLetters])
        }
    }

    return <TaskContainer>
        {testData.wordRu}
        <div style={{
            display: 'flex'
        }}>
            {selectedLetters.map((item) => {
                return <div key={item.id}>
                    {item.letter}
                </div>
            })}
        </div>

        {field.map((row, index) => {
            return (<div  key={index} className={'field-row'}>
                {(row.map((column, columnIndex) => {
                    const selectedIndex = selectedLetters.findIndex((selLetter) => selLetter.id === column.id);
                    const isHasLine = selectedIndex !== -1 && selectedIndex !== selectedLetters.length - 1;
                    let direction: LineDirection = 'left';
                    if (isHasLine) {
                        if (selectedLetters[selectedIndex + 1].position.row < selectedLetters[selectedIndex].position.row) {
                            direction = 'up';
                        } else if (selectedLetters[selectedIndex + 1].position.row > selectedLetters[selectedIndex].position.row) {
                            direction = 'down';
                        } else if (selectedLetters[selectedIndex + 1].position.column > selectedLetters[selectedIndex].position.column) {
                            direction = 'right';
                        }
                    }
                return <div ref={el => {
                    const data = el?.getBoundingClientRect();
                    field[index][columnIndex].coordinates = {
                        x: data?.x,
                        y: data?.y
                    }
                }} className={classNames('field-column', {
                    'field-column_selected': selectedIndex !== -1,
                })}
                            onMouseUp={() => {
                                setMouseDown(false)
                            }}
                            onMouseDown={() =>{
                                setMouseDown(true);
                                handleSelection(selectedIndex, column);
                            }}
                            onMouseEnter={() => {
                                if (mouseDown) {
                                    handleSelection(selectedIndex, column);
                                }
                }} key={column.id}>
                   {isHasLine && <Line direction={direction}/>}
                    {column.letter}
                </div>
            }))}
            </div>)
        })}
    </TaskContainer>
}
