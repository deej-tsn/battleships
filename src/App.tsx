import { useState } from 'react';
import './App.css'
import Grid from './components/Grid'
import {generateBoatGrid, exposeGrid, CompareGrid, updateGridToExposed} from "./other/generateBoatGrid";

function App() {

  function updateGridByIndex(row:number, col : number){
    const gridCopy = [...grid];
    gridCopy[row][col] = (grid[row][col] + 1) % 8;
    updateGrid(gridCopy);
  }
  
  // Example usage

  
  const [boatGrid, updateBoatGrid] = useState(generateBoatGrid());
  const [stateGrid, _] = useState(exposeGrid(boatGrid));

  function setUserGrid(boatGrid : number[][], exposeGrid : boolean[][]) {
    let userGrid = Array.from(Array(10), () => new Array(10).fill(7));
    userGrid = updateGridToExposed(userGrid, boatGrid, exposeGrid);
    return userGrid;
  }

  const [grid, updateGrid] = useState(setUserGrid(boatGrid, stateGrid))


  return (
    <div className=' w-full h-full flex flex-col justify-center items-center min-w-80'>
      <h1 className=' text-5xl p-5'>Battleship Puzzle</h1>
      <h2>How to Play:</h2>
      <p> There is a 10 by 10 board with numbers at the end of each row and column. These numbers tell you how many square in that row or column contain a part of a boat in it. Your job is to find out where all the boats are using the numbers and a few additional rules.<br/> Rule 1 : There are 4 boat types, Long (4 squares) Medium ( 3 squares) Small (2 squares) and Single (1 square). There is one Long, two Medium, three Small, and four Single boats hidden in the grid.<br/> Rule 2 : Boats can be placed horizontally or vertically along the grid, not diagonally. <br/> Rule 3 : boats cannot be placed diagonally, horizontally, or vertically adjancent to other boats (e.g. all squares around a boat are water). </p>
      <Grid
      Grid={grid}
      updateGridByIndex = {updateGridByIndex}
      boatGrid = {boatGrid}
      stateGrid={stateGrid}/>

      <button className=' border px-4 py-2 rounded-lg bg-zinc-500 w-fit text-lg hover:scale-110 transition-transform'  onClick={() => {const result = CompareGrid(boatGrid, grid); console.log(result);}}>Test</button>
      
    </div>
  )
}

export default App
