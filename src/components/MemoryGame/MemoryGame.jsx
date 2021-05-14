import React, {Component, PureComponent, useState, useEffect} from 'react'
import s from './MemoryGame.module.css';
import {v4} from 'uuid'

import pic0 from './img/ico/0.png';
import pic1 from './img/ico/1.png';
import pic2 from './img/ico/2.png';
import pic3 from './img/ico/3.png';
import pic4 from './img/ico/4.png';
import pic5 from './img/ico/5.png';
import pic6 from './img/ico/6.png';
import pic7 from './img/ico/7.png';
import pic8 from './img/ico/8.png';
import pic9 from './img/ico/9.png';
import pic10 from './img/ico/10.png';
import pic11 from './img/ico/11.png';
import pic12 from './img/ico/12.png';
import pic13 from './img/ico/13.png';
import pic14 from './img/ico/14.png';
import pic15 from './img/ico/15.png';
import pic16 from './img/ico/16.png';
import pic17 from './img/ico/17.png';
import pic18 from './img/ico/18.png';
import pic19 from './img/ico/19.png';
import pic20 from './img/ico/20.png';
import pic21 from './img/ico/21.png';
import pic22 from './img/ico/22.png';
import pic23 from './img/ico/23.png';
import pic24 from './img/ico/24.png';
import pic25 from './img/ico/25.png';
import pic26 from './img/ico/26.png';
import pic27 from './img/ico/27.png';
import pic28 from './img/ico/28.png';
import pic29 from './img/ico/29.png';
import pic30 from './img/ico/30.png';
import pic31 from './img/ico/31.png';
import pic32 from './img/ico/32.png';


const imgs = [
    pic0, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20, pic21, pic22, pic23, pic24, pic25, pic26, pic27, pic28, pic29, pic30, pic31, pic32
]



Array.prototype.shuffle = function () {
    let i = this.length, j, temp;
    if (i === 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

let newArr = (numberCells) => {
    let countArr = 0;
    let amountPic = 33;
    let lengthArr = (numberCells * numberCells/2);
    let arrMatrix0 = Array(amountPic).fill(0).map(() => countArr++).shuffle().slice(0, lengthArr);
    let arrMatrix = arrMatrix0.concat(arrMatrix0).shuffle();
    console.log(arrMatrix)
    return arrMatrix;
}

let FormGame = (props) => {
    let [value, setValue] = useState('4');
    let [check, setCheck] = useState('true');

    let handleSubmit = (e) => {
        e.preventDefault();
        props.onFormSubmit(value);
    }

    let handleChange = (e) => {
        setValue(e.target.value);
        setCheck('false')
    }

    return <form onSubmit={handleSubmit}>
        <fieldset className={s.fieldset}>
            <legend><b>Выберете сложность</b></legend>
                <label><input type="radio" name="difficult" value="4" onChange={handleChange}  defaultChecked={check}/> Легко</label>
                <label><input type="radio" name="difficult" value="6" onChange={handleChange}/> Тяжело </label><br/>
            <div><input type="submit" className={s.choice} value='Выбрать'/></div>
        </fieldset>
    </form>
}

let PopUp = (props) => {
    return <div className={s.popup}>


        <div className={s.textPopup}>
            <div className={s.PopupText}>
                {props.text} Начать заново?
            </div>
            <div className={s.buttons}>
                <button className={s.btnOk} onClick={() => props.handleClick(true)}>Ok</button>
                <button className={s.btnCancel} onClick={() => props.handleClick(false)}>Cancel</button>
            </div>


        </div>
    </div>
}



let CellNumb = (props) => {
    let style ={...props.moveClassName , ...props.styleBlockCell}
    return (
        <div className={s.cellNumb} style={style}>
            {(props.display)&& <button className={s.layer}
                    onClick={
                        (i) => {
                            props.handleClick(i);
                        }
                    }>
            </button>
            }
        </div>
    )
}

let BoardNumbGame = (props) => {
    let count = props.rowsCount;
    let newMatr = props.newMatr;
    console.log(newMatr[0].numPic);
    let renderCells = (num=0, styleNum=null, id=0, display=true, styleBlockCell=null) => {
        return <CellNumb
            handleClick={() => props.handleClick([num,id])}
            moveClassName={styleNum}
            display={display}
            styleBlockCell={styleBlockCell}
        />
    }

    let newTable = () => {
        let boardRows = [];
        for (let i = 0; i < count; i++) {
            let Row = [];
            for (let j = i * count; j < i * count + count; j++) {
                Row = Row.concat(renderCells(newMatr[j].numPic, newMatr[j].imgStyle, newMatr[j].id, newMatr[j].display, newMatr[j].styleBlockCell));
                if (j === (count * count) - 1) break
            }
            boardRows.push(<div className={s.row}> {Row} </div>);
        }
        return boardRows
    }
    return (
        <div className={s.boardGame}>
            <div className={s.containerBoard}>
                {newTable()}
            </div>
        </div>
    )
}

class MemoryGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newGame: true,
            onSearch: false,
            arrayMatrix: Array(100).fill(''),
            newMatrix: [],
            rowsCount: 0,
            backStep:'0',
            winGame: false,
            countMove: 0,
            startTimer:0,
            finishMin:0,
            finishSec:0
        }
        this.popUpOf=this.popUpOf.bind(this)
    }

    popUpOf(choose) {
        if(choose) this.newGame();
        this.setState({winGame: false,countMove: 0,})
    }

    selectLevel(level){
        this.setState({
            rowsCount:+level,
            arrayMatrix: Array(100).fill('')
        })
        setTimeout(()=>{this.newGame();},2)
    }

    startTimer(){
        this.setState({startTimer:new Date().getTime()})
        console.log(this.state.startTimer)
    }
    newGame ()  {
        let rows = this.state.rowsCount;
        let arrayMatrix = newArr(rows);
        console.log(arrayMatrix)
        let newMatrix = [];

        for (let i = 0; i < rows*rows; i++) {
                newMatrix.push({
                    numPic: arrayMatrix[i],
                    id: v4(),
                    imgStyle: {backgroundImage: `url(${imgs[arrayMatrix[i]]})`},
                    display: true,
                    styleBlockCell: null
                });
        }
        this.setState({
            arrayMatrix: newMatrix
        });
        this.startTimer();
    }

    testOnWin () {
        let tryElementsCounts = this.state.arrayMatrix.filter(x => x.display===false).length;
        if ( tryElementsCounts=== this.state.rowsCount*this.state.rowsCount) {
            const finishSec = Math.ceil((new Date().getTime()-this.state.startTimer)/1000);
            const finishMin = Math.floor(finishSec/60);
                this.setState({
                    winGame: true,
                    finishMin: finishMin,
                    finishSec: finishSec,
                });
        }
        console.log(this.state.arrayMatrix);
    }

    handleClick (i) {
        let newArr = this.state.arrayMatrix;
        let indexArr = newArr.findIndex(obj => obj.id === i[1]);
        console.log(newArr);
        this.setState({countMove:this.state.countMove+1})
        if (!this.state.onSearch) {
            this.setState({onSearch:i[0]});
            console.log(this.state.onSearch, i[0])
            this.setState({backStep:indexArr})
            newArr[indexArr].display = false;
        } else {
            if (this.state.onSearch===i[0]) {
                newArr[indexArr].styleBlockCell = {backgroundColor:'lightcyan'};
                newArr[this.state.backStep].styleBlockCell = {backgroundColor:'lightcyan'};
                newArr[indexArr].display = false;
                this.setState({onSearch:false})
            }
            else if(this.state.onSearch !== i[0]) {
                newArr[indexArr].display = false;
                newArr[this.state.backStep].display = true;
                console.log(indexArr, this.state.backStep)
                setTimeout( () => {
                    newArr[indexArr].display = true;
                    this.setState({
                        arrayMatrix:newArr,
                        onSearch:false
                    });
                }, 300);
            }
        }
        this.setState({arrayMatrix:newArr});
        this.testOnWin()
    }

    render() {
        return <div className={s.container}>
            <FormGame onFormSubmit={(level) => this.selectLevel(level)}/>
            <div className={s.container}>
                <BoardNumbGame
                    rowsCount={this.state.rowsCount}
                    newMatr={this.state.arrayMatrix}
                    handleClick={i => {
                        this.handleClick(i)
                    }}
                />
            </div>
            {(this.state.winGame)&&[<PopUp  handleClick={this.popUpOf}  text={`You won. Your moves: ${this.state.countMove}. \n Ваше время: ${this.state.finishMin} мин  ${this.state.finishSec} сек.`}/>,
                <div className={s.overlay}></div>]}
        </div>
    }
}

export default MemoryGame;





// let MemoryGame = (props) => {
//
//     let [rowsCount, setRowsCount] = useState(4);
//     let [arrayMatrix, setArrayMatrix] = useState(Array(100).fill(''));
//     let [backStep, setBackStep] = useState('0');
//     let [countMove, setCountMove] = useState(0);
//     let [onSearch, setOnSearch] = useState(false);
//     let [, updateState] = React.useState();
//     // Далее прописываем аналог componentDidMount
//
//     useEffect(() => {
//         newGame()
//     }, [arrayMatrix]);
//
//
//     let newGame = () => {
//         let rows = [rowsCount];
//         let arrayMatrix = newArr(rows);
//         // console.log(arrayMatrix)
//         let newMatrix = [];
//
//         for (let i = 0; i < rows*rows; i++) {
//                 newMatrix.unshift({
//                     numPic: arrayMatrix[i],
//                     id: v4(),
//                     imgStyle: {backgroundImage: `url(${imgs[arrayMatrix[i]]})`},
//                     display: true,
//                 });
//
//         }
//         setArrayMatrix(newMatrix);
//
//     }
//
//     let obnulilili =(indexArr)=>{
//         setTimeout(()=>{
//             let newArr = arrayMatrix;
//             newArr[indexArr].display = true;
//             setOnSearch(false);
//             alert('Вот и Хуй тебе');
//
//             setArrayMatrix(newArr);
//             console.log(arrayMatrix);
//         },500);
//     }
//
//     let handleClick = (i) => {
//         let newArr = arrayMatrix;
//         let indexArr = newArr.findIndex(obj => obj.id === i[1]);
//         // newArr[indexArr].display = {display: false};
//
//         console.log(arrayMatrix)
//
//         if (!onSearch) {
//             setOnSearch(i[0]);
//             console.log(onSearch, i[0])
//             setBackStep(indexArr);
//             newArr[indexArr].display = false;
//         } else {
//             if (onSearch == i[0]) {
//                 console.log(onSearch, i[0]);
//                 newArr[indexArr].display = false;
//                 setOnSearch(false);
//                 // tryWin()
//             }
//             else if(onSearch !== i[0]) {
//                 newArr[indexArr].display = false;
//                 newArr[backStep].display = true;
//                 console.log(indexArr, backStep)
//                 obnulilili(indexArr);
//                 setOnSearch(false);
//             }
//         }
//         setArrayMatrix(newArr)
//
//         // setOnSearch(i[1]);
//         // console.log(arrayMatrix)
//     }
//     // console.log(arrayMatrix[0].id)
//
//     // console.log(arrayMatrix)
//     return <div>
//         <FormGame onSubmit={(level) => this.selectLevel(level)}/>
//         <div className={s.container}>
//             <BoardNumbGame
//                 rowsCount={rowsCount}
//                 // newMatr={this.state.arrayMatrix}
//                 newMatr={arrayMatrix}
//
//                 handleClick={i => {
//                     handleClick(i)
//                 }}
//                 // moveClassName={this.state.arrayStyles}
//                 // exceptArr ={this.state.arrayExcept}
//             />
//         </div>
//
//     </div>
//
// }










