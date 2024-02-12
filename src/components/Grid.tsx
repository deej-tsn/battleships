import GridCountSquare from './GridCountSquare';
import GridRow from './GridRow';

function Grid(props : {Grid : number[][], updateGridByIndex : (row:number, col : number) => void, boatGrid : number[][], stateGrid : boolean[][]}) {
    const gridArray : JSX.Element[] = []
    for (let index = 0; index < props.Grid.length; index++) {
        gridArray.push(
        <GridRow
        key={index}
        rowNum = {index}
        boatRow = {props.boatGrid[index]}
        stateRow={props.stateGrid[index]}
        row={props.Grid[index]}
        updateGridByIndex = {props.updateGridByIndex}
        />)
        
    }
    const counts = [];
    for (let col = 0; col < props.Grid[0].length; col++) {
        let count = 0;
        for (let row = 0; row < props.Grid.length; row++) {
            if(props.boatGrid[row][col] > 0) count++;
            
        }
        counts.push(<GridCountSquare key={col} count={count}/>);
    }
    
    return (
        <div>
            {gridArray}
            <div className='flex flex-row'>
                {counts}
            </div>
        </div>
    )
}

export default Grid