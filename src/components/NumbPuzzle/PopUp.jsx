import React, {useState, Component, useEffect} from 'react';
import s from './NumbPuzzle.module.css';


let PopUp = ({moveCounts, selectNewGame}) => {
    return (
        <div className={s.popup}>
            <div>

                <div className={s.textPopUp}>
                    Колличество ходов: {moveCounts}<br/>
                    <span>Начать заново:</span>
                    <button className={s.btnYes} onClick={() => selectNewGame(true)}>Да</button>
                    <button className={s.btnNo} onClick={() => selectNewGame(false)}>Нет</button>
                </div>

            </div>

        </div>
    )
}



export default PopUp;