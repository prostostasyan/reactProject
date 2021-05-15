import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";


let NewForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field name="NewItem" component={Textarea} placeholder={"Здесь может быть ваша новость"}/>
        <button>Добавить новость</button>
    </form>
}

let AddNewForm = reduxForm({form: "News"})(NewForm);


const News = (props) => {
    console.log(props)
    let news = props.news.map(item => <div>{item.new}</div>)
    let AddNew = (text) => {
        props.addNew(text.NewItem);
    }

    return (
        <div>
            <div>Здесь будут новости</div>
            <AddNewForm onSubmit={AddNew}/>
            {news}
        </div>
    )
}

export default News;