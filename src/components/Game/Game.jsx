import React from 'react';
import s from './Game.module.css';


function calculateWinner(squares) {
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                combo: lines[i]
            }
        }
    }
    return null;
}


let PopUp = ({text, NewGame}) => {
    return (
        <div className={s.popup}>
            <div>

                <div className={s.textPopUp}>
                    {text}<br/>
                    <span>Начать заново: </span>
                    <button className={s.btnYes} onClick={() => NewGame(true)}>Да</button>
                    <button className={s.btnNo} onClick={() => NewGame(false)}>Нет</button>
                </div>

            </div>

        </div>
    )
}

let Square = (props) => {
    return (
        <button className={props.className}
                onClick={props.onClick}
        >
            {props.value}
        </button>
    )

}

class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            className={this.props.className[i]}
        />
    }

    render() {
        let boardRows = [];
        for (let i = 0; i < 3; i++) {
            let Row = [];
            for (let j = i * 3; j < i * 3 + 3; j++) {
                Row = Row.concat(this.renderSquare(j));
            }
            boardRows.push(<div className={s.boardRow}> {Row} </div>);
        }
        return (
            <div>
                {boardRows}
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick =this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this)
    }

    handleClick1 = (i) => {
        console.log(this.props)
        const history = this.props.history.slice(0, this.props.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.props.xIsNext ? 'X' : 'O';
        this.props.newMove({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.props.xIsNext,
        })

    }

    jumpTo = (step) => {
        this.props.jumpTo({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            afterGame: false,
            winGame: false
        })
    }

    NewGame = (choose) => {
        let history = [{
            squares: Array(9).fill(null)
        }];
        if (choose) {
            this.props.selectNewGame({
                history: history,
                winGame: false,
                stepNumber: 0,
                squaresStyles: Array(9).fill(s.square)
            })
        } else {
            this.props.selectNewGame({
                winGame: false,
                afterGame: true
            })
        }

    }

    render() {
        const history = this.props.history;
        const current = history[this.props.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Перейти к ходу #' + move :
                'К началу игры';
            return (
                <ul>
                    <li key={move}>
                        <button className={s.moveState} onClick={() => {
                            this.jumpTo(move)
                            this.props.oldStyle({squaresStyles: Array(9).fill(s.square)});
                        }}>{desc}</button>
                    </li>
                </ul>
            )
        });

        let status;
        if (winner && !this.props.afterGame) {
            status = 'Выиграл: ' + winner.winner
            this.props.selectNewGame({
                winGame: true
            })
            winner.combo.forEach(elem => {
                this.props.squaresStyles[elem] = s.comboWin
            });
        }


        if (this.props.history.length === 10 && !this.props.afterGame && !this.props.winGame) {
            status = 'Ничья';
            this.props.selectNewGame({
                winGame: true
            })
        }
        return (
            <div className={s.GameContainer}>
                <div className={s.game}>
                    <div>
                        <Board
                            className={this.props.squaresStyles}
                            squares={current.squares}
                            onClick={(i) => this.handleClick1(i)}
                            comboWins={winner}// Обращение к объекту созданным ф-цией calculateWinner
                        />
                    </div>
                    <div className={s.gameInfo}>
                        {/*<div>{status}</div>*/}
                        <ol className={s.roundedList}>{moves}</ol>
                    </div>
                    {(this.props.winGame) && [<PopUp text={status} NewGame={this.NewGame}/>,
                        <div className={s.overlay}></div>]}
                </div>
            </div>
        )
    }
}


export default Game;
