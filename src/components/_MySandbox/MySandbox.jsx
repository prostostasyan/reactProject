import React, {Component, useState, useEffect} from 'react'
import s from './MySandbox.module.css';
import comboStyle from 'classnames';
import {v4} from 'uuid'

let LevelThreeContext = React.createContext();


function LevelThree() {
    return (
        <LevelThreeContext.Consumer>
            {({one, two})=><div><h1>{one}</h1><h1>{two}</h1></div>}
        </LevelThreeContext.Consumer>
    )
}
function LevelTwo() {
    return <LevelThree/>
}
const  LevelOne = () =>  {

    return <LevelThreeContext.Provider value={{one: v4(),two:'Купить колбасу'}}>
    <div><LevelTwo/></div>
    </LevelThreeContext.Provider>
}




function MySandbox(props) {
    return<div><LevelOne/></div>

}


export default MySandbox







