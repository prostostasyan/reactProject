import React, {useState, Component, useEffect} from 'react';
import s from './NumbPuzzle.module.css';
import {Field, reduxForm, reset} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";


let FormGame = (props) => {
    const [level, setLevel] = useState('4');
    return <form onSubmit={props.handleSubmit} className={s.formGame}>
        <div className={s.line}>Skill Level</div>
        <div className={s.line}><Field name="gameDiff" component={Input} type="range" min="3" max="9" value="4"
                                       onChange={(x, value) => setLevel(value)}/></div>
        <div className={s.line}>{level}/9</div>
        <button className={s.btnSearch}>Начать новую игру</button>
    </form>
}

FormGame = reduxForm({form: "numbGame"})(FormGame);


export default FormGame;
