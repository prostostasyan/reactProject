import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logoLeft from './img/logoLeft.png';
import logoRight from './img/logoRight.png';

const Header = (props) => {
    return <header className={s.header}>
        <img src={logoLeft} className={s.logo} />
        <img src={logoRight} className={s.logo2} />

        <div className={s.loginBlock}>
            { props.isAuth
                ? <div > <span className={s.textLogout}>Имя пользователя: {props.login} </span> <button onClick={props.logout} className={s.logout}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;