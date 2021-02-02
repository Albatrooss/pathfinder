import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Cell from './Cell';

const GridWrapper = styled.div`
    display: grid;
    ${({theme, gridSize}) => css`
        background-color: ${theme.color.primary};
        grid-template-columns: repeat(${gridSize}, 1fr);
        grid-template-rows: repeat(${gridSize}, 1fr);
    `}
    grid-gap: 2px;
    padding: 2px;
    width: 80vmin;
    height: 80vmin;
    margin: 0 auto;
`;

const Start = styled.div`
    background-color: green;
    width: 70%;
    height: 70%;
`;

const End = styled.div`
    background-color: red;
    width: 70%;
    height: 70%;
`;

const Block = styled.div`
    background-color: grey;
    width: 90%;
    height: 90%;
`;

export default function Grid({ cells, gridSize, setStartNode, setEndNode, clicking, setClicking, blocked, addToBlocked }) {


    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);
        
        setTimeout(() => {
            target.style.display = 'none';
        }, 0);
    }

    const dragOver = e => e.stopPropagation();

    let last = 0;
    const mouseMove = e => {
        let split = e.target.id.split('-')
        let isCell = split[0] === 'cell';
        if (clicking && isCell) {
            let id = split[1]
            if (last !== id) {
                addToBlocked(Number(id));
                last = id;
            }
        }
    }

    return (
        <GridWrapper id='grid' gridSize={gridSize} onMouseMove={mouseMove} onMouseDown={() => setClicking(true)}>
            {cells.map((cell, i) => {
                let data;
                if (blocked.includes(i)) cell = 'block'
                switch(cell) {
                    case 'start':
                        data = <Start id="startNode" draggable={true} onDragStart={dragStart} onDragOver={dragOver} />
                        break;
                    case 'end':
                        data = <End id="endNode" draggable={true} onDragStart={dragStart} onDragOver={dragOver} />
                        break;
                    case 'block':
                        data = <Block id="endNode"/>
                        break;
                    default:
                        data = null;
                }
                return (<Cell key={i} id={`cell-${i}`} setStartNode={setStartNode} setEndNode={setEndNode}>
                    {data}
                </Cell>)
            }
            )}
        </GridWrapper>
    )
}
