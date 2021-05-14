
const ADD_NEW = 'ADD_NEW';

let newsState = {
    news: [
        {new: 'Новость созданная ботом'},
        {new: 'Еще одна новость созданная ботом'},
        {new: 'И еще одна новость созданная ботом'}
    ]
};

const newsReducer = (state = newsState, action) => {

    switch (action.type) {
        case ADD_NEW: {
            let newNew = {
                new:action.text
            }
            return {
                news: [...state.news, newNew],
                // new: 'sgfsdgsg'
            };
        }
        default:
            return state;
    }
}

export const addNew= (text) => ({type: ADD_NEW, text})

export default newsReducer;