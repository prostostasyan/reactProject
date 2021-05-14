import React from 'react';
import s from './Navbar.module.css';
import {NavLink, Route, Switch} from "react-router-dom";
import NumbPuzzle from "../NumbPuzzle/NumbPuzzle";

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/game" activeClassName={s.activeLink}>Game</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/numbGame" activeClassName={s.activeLink}>NumbGame</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/myTodoList" activeClassName={s.activeLink}>To Do List</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/searchMovie" activeClassName={s.activeLink}>Search movie</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/numbPuzzle" activeClassName={s.activeLink}>Number Puzzle</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/MemoryGame" activeClassName={s.activeLink}>Memory Game</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/MySandbox" className={s.sandbox} activeClassName={s.activeLink}>Моя песочница</NavLink>
            </div>






            <div className={s.item}>
                <NavLink to="/news" className={s.opacity} activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/myIP"  className={s.opacity} activeClassName={s.activeLink}>My IP</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/sandBox" className={s.opacity} activeClassName={s.activeLink}>Sandbox</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/sandBox2" className={s.opacity} activeClassName={s.activeLink}>Sandbox2</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/flowWindow" className={s.opacity} activeClassName={s.activeLink}>Flow window</NavLink>
            </div>


            <div className={s.item}>
                <a className={s.opacity}>Settings</a>
            </div>


        </nav>
    )
}

export default Navbar;