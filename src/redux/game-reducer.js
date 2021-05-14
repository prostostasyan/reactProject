import s from "../components/Game/Game.module.css";

const OlD_STYLE = 'OlD_STYLE';
const JUMP_TO = 'JUMP_TO';
const NEW_MOVE = 'NEW_MOVE';
const SELECT_NEW_GAME ='SELECT_NEW_GAME';

let gameNumState = {
    history: [{
        squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    squaresStyles: Array(9).fill(s.square),
    squares: [],
    winGame:false,
    afterGame:false
};

const gameReducer = (state = gameNumState, action) => {

    switch (action.type) {

        case OlD_STYLE: {
            return {
                ...state, ...action.style
            };
        }
        case NEW_MOVE: {
            let newMove = {
                ...action.newMoveObj
            }
            return {
                ...state, ...newMove
            };
        }
        case JUMP_TO: {
            let step = {
                ...action.step
            }
            return {
                ...state, ...step
            };
        }
        case    SELECT_NEW_GAME: {

            return {
                ...state, ...action.choose
            };

        }


        default:
            return state;
    }
}

export const newMove = (newMoveObj) => ({type: 'NEW_MOVE', newMoveObj});
export const jumpTo = (step) => ({type: 'JUMP_TO', step});
export const oldStyle = (style) => ({type: 'OlD_STYLE', style});
export const selectNewGame = (choose) => ({type: 'SELECT_NEW_GAME', choose});

export default gameReducer;