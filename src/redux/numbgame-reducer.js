const NEW_MOVE = 'NEW_MOVE';
const LEVEL_UP = 'LEVEL_UP';
const NEW_GAME = 'NEW_GAME';

let gameState = {
    isArr: false,
    count: 2,
    startPoint: 1,
    move: 1,
    numNumbArr: [],
    squaresNumbStyles: []
};

const numbgameReducer = (state = gameState, action) => {

    switch (action.type) {

        case NEW_GAME: {
            return {
                ...state, ...action.start
            };
        }

        case NEW_MOVE: {
            return {
                ...state, ...action.newMoveObj
            };
        }

        case LEVEL_UP: {
            let step = {
                ...action.newLevel
            }
            return {
                ...state, ...step
            };
        }

        default:
            return state;
    }
}

export const newMove1 = (newMoveObj) => ({type: 'NEW_MOVE', newMoveObj});
export const levelUp = (newLevel) => ({type: 'LEVEL_UP', newLevel});
export const newGame = (start) => ({type: 'NEW_GAME', start});

export default numbgameReducer;