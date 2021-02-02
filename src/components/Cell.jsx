import React from 'react';
import styled from 'styled-components';

const CellWrapper = styled.div`
    background-color: ${({theme}) =>
        theme.color.light
    };
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Cell({id, setStartNode, setEndNode, children}) {

    const dragOver = e => e.preventDefault();
    const drop = e => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('card_id');
        const card = document.getElementById(cardId);
        card.style.display = 'block';
        e.target.appendChild(card);
        if (cardId === 'startNode') {
            setStartNode(e.target.id);
        } else {
            setEndNode(e.target.id);
        }
    }

    return (
        <CellWrapper
        id={id}
        onDrop={drop}
        onDragOver={dragOver}
        >
            {children}
        </CellWrapper>
    )
}
