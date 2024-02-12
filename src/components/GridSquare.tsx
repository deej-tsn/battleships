import semiCircle from "../assets/semiCircle.png";

function GridSquare(props : {value : number, boatValue : number, state : boolean, updateGridByIndex : (row:number, col : number) => void, row : number, col: number}) {
  const classArray = ['empty','circle','full','rotate-90','-rotate-90','rotate-180','']

  return (
    <div className={`w-6 md:w-12 m-1 h-6 md:h-12 border rounded-sm hover:bg-slate-500 relative`} onClick={() => {if(props.state == false) props.updateGridByIndex(props.row, props.col)}}>
        
        {props.state && props.boatValue < 3 && <div className={`w-full h-full ${classArray[props.boatValue]}`}>
        </div>}
        {props.state && props.boatValue > 2 && <img className={`w-full h-full absolute top-0 left-0 ${classArray[props.boatValue]}`} src={semiCircle}/>}


        {!props.state && props.value < 3 && <div className={`w-full h-full ${classArray[props.value]}`}>
        </div>}
        {!props.state && props.value > 2 && props.value <= 6 && <img className={`w-full h-full absolute top-0 left-0 ${classArray[props.value]}`} src={semiCircle}/>}
        
        
    </div>
  )
}

export default GridSquare