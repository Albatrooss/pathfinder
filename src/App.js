import React, { useState } from 'react'
import styled from 'styled-components';

import Grid from './components/Grid';
import { Wrapper } from './theme';

const Main = styled(Wrapper)`
  display: flex;
  flex-direction: column;

`;

let initialCells = [];
for (let i = 0; i < 100; i++) {
  if (i === 0) {
    initialCells.push('start');
  } else if (i === 99) {
    initialCells.push('end');
  } else {
    initialCells.push(null);
  }
}

export default function App() {

  const [click, setClick] = useState(false);
  const [cells, setCells] = useState(initialCells)
  const [gridSize, setGridSize] = useState(10);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(99);
  let [blocked, setBlocked] = useState([]);

  const assignStartNode = id => {
    let num = Number(id.split('-')[1]);
    setStartNode(num);
  }

  const assignEndNode = id => {
    let num = Number(id.split('-')[1]);
    setEndNode(num);
  }

  const assignClick = bool => {
    setClick(bool);
  }

  const addToBlocked = id => {
    if (blocked[blocked.length - 1] === id) return;
    setBlocked(prev => [...prev, id])
  }

  return (
    <Main onMouseUp={() => setClick(false)}>
      <h1>HELLO WOLRD</h1>
      <p>Start: {startNode} </p>
      <p>End: {endNode} </p>
      <Grid 
        cells={cells} 
        gridSize={gridSize} 
        setStartNode={assignStartNode} 
        setEndNode={assignEndNode} 
        clicking={click}
        setClicking={assignClick}
        blocked={blocked}
        addToBlocked={addToBlocked}
      />
    </Main>
  )
}
