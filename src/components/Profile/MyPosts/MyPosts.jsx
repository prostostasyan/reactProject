import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea,Input} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(500);

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit} >
        <div className={s.postForm}>
            <Field  name="newPostText" component={Input} placeholder={"Post message"}
                   validate={[required, maxLength10]} />


            <button>Add post</button>
        </div>
    </form>;
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const  MyPosts = React.memo((props) => {

        let postsElements =
            props.posts.map(p => <Post  message={p.message} likesCount={p.likesCount}/>);

        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    <div >{postsElements}</div>
                </div>
            </div>
        )
});




export default MyPosts;