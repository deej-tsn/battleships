
function LoadGrid() : any {
    let grid = localStorage.getItem("test");
    if (grid == null) {
        return Array.from(Array(10), () => new Array(10).fill(false));
    }else{
        grid = JSON.parse(grid);
        return grid;
    }
}

function updateGridToExposed(userGrid: number[][], boatGrid : number[][], exposeGrid : boolean[][]) : number[][]{
    for (let row = 0; row < exposeGrid.length; row++) {
        for (let col = 0; col < exposeGrid[0].length; col++) {
            if (exposeGrid[row][col]) {
                userGrid[row][col] = boatGrid[row][col];
            }
            
        }
        
    }
    return userGrid;
}

function CompareCol(boatGrid : number[][], userGrid : number[][]) : boolean{
    let boatCol = 0;
    let userCol = 0;
    for (let col = 0; col < boatGrid[0].length; col++) {
        userCol = 0;
        boatCol = 0;
        for (let row = 0; row < boatGrid.length; row++) {
            if (boatGrid[row][col] > 0) {
                boatCol++;
            }
            if (userGrid[row][col] > 0 && userGrid[row][col] < 7) {
                userCol++;
            }
            
        }
        if(userCol != boatCol) return false;
    }
    return true;
}

function CompareRow(boatGrid : number[][], userGrid : number[][]) : boolean {
    const boatRowReduce = boatGrid.map((row, _) => row.filter((val, _) => val > 0).length);
    const userRowReduce = userGrid.map((row, _) => row.filter((val, _) => val > 0 && val < 7).length);
    for (let row = 0; row < boatRowReduce.length; row++) {
        if (boatRowReduce[row] != userRowReduce[row]) return false;
    }
    return true;
}

function CompareGrid(boatGrid: number[][], userGrid : number[][]) {
    return CompareCol(boatGrid,userGrid) && CompareRow(boatGrid, userGrid);
}

function exposeGrid(boatGrid : number[][]) : boolean[][]{
    const outputGrid = Array.from(Array(10), () => new Array(10).fill(false));
    for (let row = 0; row < boatGrid.length; row++) {
        for (let col = 0; col < boatGrid[0].length; col++) {
            let randomChoice = Math.random();
            if(boatGrid[row][col] > 0 && randomChoice > 0.75) outputGrid[row][col] = true;
            else if(randomChoice > 0.95) outputGrid[row][col]= true;
        }
    }
    return outputGrid;
}

function generateBoatGrid(){
    let newBoatGrid = Array.from(Array(10), () => new Array(10).fill(0));
    let newValidGrid = Array.from(Array(10), () => new Array(10).fill(false));
    let generated = false;
    let points = [4,3,3,2,2,2,1,1,1,1];
    let index = 0;

    // First Generate the Big Ship - 4 squares

    // Then Generate 2 Medium Ships - 3 squares

    // Then Generate 3 Small Ships - 2 squares

    // Finally Generate 4 Tiny Ships - 1 Square
    while (!generated) {
        let random = getRandomPoint(newValidGrid);
        let placeable = testPlacement(points[index], random, newValidGrid);
        if(placeable == 0) continue;
        else{
            if(placeable == 3) placeable = Math.floor(Math.random() * 2) + 1;
            newBoatGrid = fillBoatGrid(points[index], random, newBoatGrid, placeable);
            newValidGrid = fillValidGrid(points[index], random, newValidGrid, placeable);
            index++;
        }
        if(index == points.length) generated = true;
    }
    return newBoatGrid;
  }

  function fillBoatGrid(boatSize : number, point : number, boatGrid : number[][], placement : number) : number[][] {
    const row = Math.floor(point / 10);
    const col = point % 10;
    if (boatSize == 1) {
        boatGrid[row][col] = 1;
    }
    else if(placement == 2){
        for (let i = 0; i < boatSize; i++) {
            if (i == 0) {
                boatGrid[row][col+i] = 3;
            }else if(i == boatSize-1){
                boatGrid[row][col+i] = 4;
            }
            else{
                boatGrid[row][col+i] = 2;
            }
            
        }
    }else{
        for (let i = 0; i < boatSize; i++) {
            if (i == 0) {
                boatGrid[row+i][col] = 5;
            }else if(i == boatSize-1){
                boatGrid[row+i][col] = 6;
            }
            else{
                boatGrid[row+i][col] = 2;
            }
        }
    }
    return boatGrid;
  }

  function fillValidGrid(boatSize : number, point : number, valid_placement_grid : boolean[][], placement: number) : boolean[][] {
    const row = Math.floor(point / 10);
    const col = point % 10;
    if(placement == 2){
        for (let i = -1; i < boatSize+1; i++) {
            for (let j = -1; j < 2; j++) {
                if(row+j >= 0 && row+j < valid_placement_grid.length && col + i >= 0 && col + i < valid_placement_grid[0].length)
                valid_placement_grid[row+j][col+ i] = true;
            }
        }
    }else{
        for (let i = -1; i < boatSize+1; i++) {
            for (let j = -1; j < 2; j++) {
                if(row+i >= 0 && row+i < valid_placement_grid.length && col + j >= 0 && col + j < valid_placement_grid[0].length)
                valid_placement_grid[row+i][col + j] = true;
            }
        }
    }
    return valid_placement_grid;
  }
function testPlacement(boatSize : number, point : number, grid : boolean[][]) : number {
    // test horizontal
    let i = 1;
    const row = Math.floor(point / 10);
    const col = point % 10;
    let hor = true;
    let ver = true;
    while(i < boatSize){
        if(col + i >= 10 || grid[row][col+i]){
            hor = false;
            break;
        }
        i++;
    }

    // test vertical

    i = 1;
    while(i < boatSize){ 
        if(row + i >= 10 || grid[row+i][col]){
            ver = false;
            break;
        }
        i++;
    }
    if (hor && ver) {
        return 3;
    }else if(hor){
        return 2;
    }else if(ver){
        return 1;
    }else return 0;

}

function getRemainingPoints(grid : boolean[][]) : number[] {
    const remainingPoints = []
    for (let index = 0; index < grid.length; index++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (!grid[index][col]) remainingPoints.push(index*10 + col);
        }
    }
    return remainingPoints;
}

function getRandomPoint(grid : boolean[][]) : number {
    const remainingPoints = getRemainingPoints(grid);
    if(remainingPoints.length == 0){
        console.log("ERROR NO MORE VALID POSITIONS")
        return -1;
    }
    else{
        let index = Math.floor(Math.random()*remainingPoints.length);
        return remainingPoints[index];
    }
}

export { generateBoatGrid, exposeGrid, CompareGrid, updateGridToExposed}