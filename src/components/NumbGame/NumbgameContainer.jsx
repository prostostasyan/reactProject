import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";

import NumbGame from "./NumbGame";
import {levelUp, newGame, newMove1} from "../../redux/numbgame-reducer";





//Далее с помощью mapStateToProps мы получаем из Reducer объект newsState
let mapStateToProps = (state) => {
    return {
        isArr: state.numbGame.isArr,
        count: state.numbGame.count,
        startPoint: state.numbGame.startPoint,
        move: state.numbGame.move,
        numNumbArr: state.numbGame.numNumbArr,
        squaresNumbStyles: state.numbGame.squaresNumbStyles,
    }
}


 // подключаем mapStateToProps и экшены из Reducer("news-reducer.js") в объекте через запятую {addNew, ..., ...,...} к компоненте GameContainer
// нужно знать еще , что  State достается из контекста с помощью <Provider />

export default compose(
    connect(mapStateToProps,{levelUp, newGame, newMove1}) // подключаем mapStateToProps и экшены из Reducer("news-reducer.js") в объекте через запятую {addNew, ..., ...,...}, нужно знать еще , что  State достается из контекста с помощью <Provider />
)(NumbGame)


