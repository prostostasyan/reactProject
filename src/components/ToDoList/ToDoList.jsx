import React, {Component, useState, useEffect} from 'react'
import s from './ToDoList.module.css';
import {Field, reset, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {v4} from 'uuid'

let Form = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field name="NewItem" component={Input} type='text' placeholder="введите задачу" value='dgdg'/>
        <button onClick={() => reset}>Добавить</button>
    </form>
}


const afterSubmit = (result, dispatch) =>
    dispatch(reset('todo'));

Form = reduxForm({form: "todo", onSubmitSuccess: afterSubmit})(Form);


function ToDoItem(props){

        return (
            <ul className={s.theList}>
                {props.entries.map((item) =>
                    <li onClick={() => props.delete(item.key)} key={item.id}> {item.text} </li>
                )}
            </ul>
        )

}

function ToDoList() {
    const [items, setItems] = useState([{text: 'Пример', key: v4()}]);

    function addItem(text) {
        if (text.NewItem !== undefined) {
            setItems([{
                text: text.NewItem,
                key: v4()
            }, ...items]);
        }
    }

    function deleteItem(key) {
        let deleteItems = items.filter(item => item.key !== key);
        console.log(deleteItems)
        setItems(deleteItems);
    }

    console.log(items)


    return (
        <div className={s.todoListMain}>
            <div className={s.header}>
                <Form onSubmit={addItem} className={s.myForm}/>
            </div>
            <ToDoItem entries={items}
                      delete={deleteItem}
            />
        </div>

    )

}


let ToDoListContainer = () => <div className={s.container}>
    <ToDoList/>
</div>

export default ToDoListContainer;


