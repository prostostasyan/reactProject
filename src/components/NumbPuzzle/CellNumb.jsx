import React, {useState, Component, useEffect} from 'react';
import s from './NumbPuzzle.module.css';


let CellNumb = (props) => {
    return (
        <button className={s.cellNumb} style={props.moveClassName} onClick={
            (i) => {
                props.handleClick(i);
            }
        }>
            {props.value}

        </button>
    )
}

export default CellNumb;
