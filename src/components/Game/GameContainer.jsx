import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";

import Game from "./Game";
import {newMove, jumpTo, oldStyle,selectNewGame} from "../../redux/game-reducer";


//Далее с помощью mapStateToProps мы получаем из Reducer объект newsState
let mapStateToProps = (state) => {
    return {
        history: state.gamePage.history,
        stepNumber: state.gamePage.stepNumber,
        xIsNext: state.gamePage.xIsNext,
        squaresStyles: state.gamePage.squaresStyles,
        winGame: state.gamePage.winGame,
        afterGame: state.gamePage.afterGame
    }
}


export default compose(
    connect(mapStateToProps, {newMove, jumpTo, oldStyle, selectNewGame}))(Game) // подключаем mapStateToProps и экшены из Reducer("news-reducer.js") в объекте через запятую {addNew, ..., ...,...} к компоненте GameContainer
// нужно знать еще , что  State достается из контекста с помощью <Provider />