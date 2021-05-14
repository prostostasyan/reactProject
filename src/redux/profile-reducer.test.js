import profileReducer, {addPostActionCreator} from "./profile-reducer";

// let newState = profileReducer({}, {})

it ("length of new post should be increment",() => {
    // let action =addPostActionCreator('Hello');
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ]
    }

    let newState = profileReducer(state,action);

    expect (newState.posts.length).toBe (4);
});