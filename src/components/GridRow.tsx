import GridCountSquare from "./GridCountSquare";
import GridSquare from "./GridSquare";


function GridRow(props : {row : number[], rowNum: number, updateGridByIndex : (row:number, col : number) => void , boatRow : number[], stateRow : boolean[]}) {
    const rowElement: JSX.Element[] = []
    for (let index = 0; index < props.row.length; index++) {
        rowElement[index] = <GridSquare key={index} value = {props.row[index]} boatValue={props.boatRow[index]} state={props.stateRow[index]} updateGridByIndex = {props.updateGridByIndex} row={props.rowNum} col={index}/>;
    }
    const count = props.boatRow.reduce((preVal, currElem) => {
        return (currElem > 0) ? (preVal + 1) : preVal;
    }, 0)
  return (
    <div className=" flex flex-row">
        {rowElement}
        <div className="w-6 md:w-12 h-12 flex justify-center items-center">
        <GridCountSquare count={count}/>
        </div>
    
    </div>
  )
}

export default GridRow