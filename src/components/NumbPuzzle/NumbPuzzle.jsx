import React from 'react';
import s from './NumbPuzzle.module.css';
import BoardNumbGame from "./BoardNumbGame";
import FormGame from "./FormGame";
import PopUp from "./PopUp";


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

function convertToSimpleArray(array) {
    let res = [];
    for (let i = 0; i < array.length; i++)
        if (!Array.isArray(array[i]))
            res.push(array[i]);
        else
            res = res.concat(convertToSimpleArray(array[i]));
    return res;
}

let newArr = (count) => {
    let arr = [];
    for (let i = 1; i <= (count * count - 1); i++) {
        arr.push(i)
    }
    arr.shuffle();
    return arr;
}

class NumbPuzzle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newGame: true,
            arrayMatrix: [],
            newMatrix: [],
            rowsCount: 4,
            arrayStyles: [],
            winGame: false,
            countMove: 0,
        }
        this.changeArr = this.changeArr.bind(this)
    }

    componentDidMount() {
        this.newGame()
    }

    newGame() {
        let rows = this.state.rowsCount;
        let arrayMatrix = newArr(rows);
        console.log(arrayMatrix)
        let newMatrix = [];
        let arrayStyles = [];
        let count = 0;
        for (let i = 0; i < rows; i++) {
            newMatrix.push([]);
            for (let j = 0; j < rows; j++) {
                newMatrix[i][j] = arrayMatrix[count++];
                arrayStyles[i * rows + j] = {left: "0", top: "0", zIndex:'9999'}
            }
        }
        newMatrix[rows - 1][rows - 1] = 0;
        console.log(arrayStyles)

        this.setState({
            arrayMatrix: arrayMatrix,
            newMatrix: newMatrix,
            arrayStyles: arrayStyles,
            winGame: false,
            countMove: 0
        })
    }

    directFunc(numCell, direction) {
        let step = 104;
        let newThisStyle;
        let stylesArray = this.state.arrayStyles;
        let thisStyle = this.state.arrayStyles[numCell];
        this.setState({
            countMove: this.state.countMove + 1,
        })
        switch (direction) {
            case 'left':
                newThisStyle = {...thisStyle, left: +thisStyle.left.slice(0, -2) - step + 'px'};
                stylesArray[numCell] = newThisStyle;
                this.setState({
                    arrayStyles: stylesArray
                })
                break;
            case "right":
                newThisStyle = {...thisStyle, left: +thisStyle.left.slice(0, -2) + step + 'px'};
                stylesArray[numCell] = newThisStyle;
                this.setState({
                    arrayStyles: stylesArray
                })
                break;
            case 'bottom':
                newThisStyle = {...thisStyle, top: +thisStyle.top.slice(0, -2) + step + 'px'};
                stylesArray[numCell] = newThisStyle;
                this.setState({
                    arrayStyles: stylesArray
                })
                break;
            case 'top':
                newThisStyle = {...thisStyle, top: +thisStyle.top.slice(0, -2) - step + 'px'};
                stylesArray[numCell] = newThisStyle;
                console.log('top', stylesArray)
                this.setState({
                    arrayStyles: stylesArray
                })
                break;
            default:
        }
    }

    changeArr(elem) {
        let rows = this.state.rowsCount;
        let row;
        let col;
        let arrNumb = this.state.newMatrix

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                if (arrNumb[i][j] === elem) {
                    row = i;
                    col = j;
                }
            }
        }

        if ((row - 1) >= 0) {
            if (arrNumb[row - 1][col] === 0) {
                arrNumb[row][col] = 0;
                arrNumb[row - 1][col] = elem;
                console.log('top');
                this.directFunc(elem, 'top');
            }
        }
        if ((row + 1) < rows) {
            if (arrNumb[row + 1][col] === 0) {
                arrNumb[row][col] = 0;
                arrNumb[row + 1][col] = elem;
                console.log('bottom');
                this.directFunc(elem, 'bottom');
            }
        }
        if ((col - 1) >= 0) {
            if (arrNumb[row][col - 1] === 0) {
                arrNumb[row][col] = 0;
                arrNumb[row][col - 1] = elem
                console.log('left');
                this.directFunc(elem, 'left');
            }
        }
        if ((col + 1) < rows) {
            if (arrNumb[row][col + 1] === 0) {
                arrNumb[row][col] = 0;
                arrNumb[row][col + 1] = elem;
                console.log('right');
                this.directFunc(elem, 'right');
            }
        }
        this.setState({
            newMatrix: arrNumb,
        })
        console.log(this.state.newMatrix, this.state.countMove)
    }

    handleClick(i) {
        this.changeArr(i);
        this.testOnWin()
    }

    selectNewGame(yesNo) {
        (yesNo) ? this.newGame() : alert('Так нельзя')

    }

    selectLevel(level) {
        if (level.gameDiff === undefined) level.gameDiff = 4;
        this.setState({
            rowsCount: +level.gameDiff,
        })
        setTimeout(() => {
            this.newGame()
        }, 1);
    }

    testOnWin() {
        let tryArr = convertToSimpleArray(this.state.newMatrix);
        let count = 1;
        let win = false;
        let numberCells = this.state.rowsCount * this.state.rowsCount;
        tryArr.forEach(e => {
            if (+e === count) {
                count++;
            }
            if (count === numberCells && !win) {
                setTimeout(() => {
                    this.setState({
                        winGame: true,
                    })
                }, 1);
                win = true;
            }
            if (+e === 0) --count;
        })
    }

    render() {
        return <div >
            <FormGame onSubmit={(level) => this.selectLevel(level)}/>
            <div className={s.container}>
                <BoardNumbGame

                    rowsCount={this.state.rowsCount}
                    newMatr={this.state.arrayMatrix}
                    handleClick={i => {
                        this.handleClick(i)
                    }}
                    moveClassName={this.state.arrayStyles}
                />
            </div>

            {(this.state.winGame) && [<PopUp moveCounts={this.state.countMove}
                                             selectNewGame={(yes) => this.selectNewGame(yes)} className={s.popup}/>,
                <div className={s.overlay}></div>]}
        </div>
    }
}

export default NumbPuzzle;
