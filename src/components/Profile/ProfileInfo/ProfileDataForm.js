import React from "react";
import s from './ProfileInfo.module.css';
import {CreateField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        { error && <div className={style.formSummaryError}>
            {error}
        </div>
        }

        <div className={style.formOther}>
            <div>
                <b>Full name</b>: {CreateField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: { CreateField("", "lookingForAJob", [], Input, {type: "checkbox"} )}
            </div>

            <div>
                <b>My professional skills</b>:
                { CreateField("My professional skills", "lookingForAJobDescription", [], Textarea  )}
            </div>
            <div>
                <b>About me</b>:
                { CreateField("About me", "aboutMe", [], Textarea  )}
            </div>
        </div>

        <div className={style.formContact}>
            <b>Contacts</b>:
            {Object.keys(profile.contacts).map( key => {
                return <div className={s.contact}>
                <b>{key}: {CreateField(key,'contacts.'+key,[],Input)}</b>
                </div>
            })}

        </div>

    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;