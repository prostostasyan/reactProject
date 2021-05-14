import React, {useState, Component, useEffect} from 'react';
import s from './NumbPuzzle.module.css';
import CellNumb from "./CellNumb";

let BoardNumbGame = (props) => {
    let count = props.rowsCount;
    let newMatr = props.newMatr;
    let renderCells = (num) => {
        return <CellNumb
            value={num}
            handleClick={() => props.handleClick(num)}

            moveClassName={
                (num)? props.moveClassName[num] :
                {opacity: '0.0', marginTop: '-30px', zIndex: '0'}
            }
        />
    }

    let newTable = () => {
        let boardRows = [];
        for (let i = 0; i < count; i++) {
            let Row = [];
            for (let j = i * count; j < i * count + count; j++) {
                Row = Row.concat(renderCells(newMatr[j]));
                if (j === (count * count) - 1) break
            }
            boardRows.push(<div> {Row} </div>);
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


export default BoardNumbGame;
