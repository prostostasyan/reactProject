import React from 'react';
import s from './NumbGame.module.css';

let CellNumb = (props) => {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.value}

        </button>
    )
}

Array.prototype.shuffle = function () {
    let i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}
let newArr = (count) => {
    let arr = [];
    for (let i = 1; i <= (count * count); i++) {
        arr.push(i)
    }
    arr.shuffle();
    return arr;
}



let BoardNumbGame = (props) => {
    let count = props.count;
    let numNumbArr = props.numNumbArr;
    let renderCells = (num) => {
        return <CellNumb
            value={num}
            dataId={num}
            onClick={() => props.onClick(num)} // А почму так????
            className={props.className[num]}
        />
    }
    let newTable = () => {
        let boardRows = [];
        for (let i = 0; i < count; i++) {
            let Row = [];
            for (let j = i * count; j < i * count + count; j++) {
                Row = Row.concat(renderCells(numNumbArr[j]));
            }
            boardRows.push(<div> {Row} </div>);
        }
        return boardRows
    }
    return (
        <div>
            {newTable()}

        </div>
    )
}

class NumbGame extends React.Component {
    handleClick(i) {
        const squaresNumbStyles = this.props.squaresNumbStyles;
        const squares = this.props.numNumbArr;
        let start = this.props.startPoint;
        let move = this.props.move;
        let count = this.props.count;

        if (i === start) {
            squaresNumbStyles[i] = s.select_NumbGame;
            this.props.newMove1({
                startPoint: ++start,
                squaresNumbStyles: squaresNumbStyles,
                move: ++move,
            })
        }

        console.log('i', i);
        console.log('cell', squares[i])
        console.log("move", move);

        if (this.props.move === this.props.count * this.props.count) {
            this.props.levelUp({
                isArr: false,
                count: ++count,
                move: 1,
                startPoint: 1,
            })
        }
    }

    render() {

        if (!this.props.isArr ) {
            let arrClass = Array(this.props.count * this.props.count + 1).fill(s.cell_NumbGame);
            console.log(arrClass);
            let newMatr = newArr(this.props.count);
            this.props.newGame({
                isArr: true,
                numNumbArr: newMatr,
                squaresNumbStyles: arrClass
            });
        }

        return <div className={s.NumbGameContainer}>
            <div className={s.NumbGame}>
                <BoardNumbGame
                    count={this.props.count}
                    numNumbArr={this.props.numNumbArr}
                    onClick={(i) => this.handleClick(i)}
                    className={this.props.squaresNumbStyles}
                />
            </div>
        </div>



    }
}



export default NumbGame;
