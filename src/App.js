import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import HashRouter from "react-router-dom/HashRouter";
import Redirect from "react-router-dom/Redirect";
import NewsContainer from "./components/News/NewsContainer";
import GameContainer from "./components/Game/GameContainer";
import SandBox from "./components/_sandbox/SandBox";
import SandBox2 from "./components/_sandbox2/SandBox2";
import MyIP from "./components/MyIP/MyIP";
import ToDoList from "./components/ToDoList/ToDoList";
import NumbgameContainer from "./components/NumbGame/NumbgameContainer";
import FlowWindowContainer from "./components/FlowWindow/FlowWindow";
import SearchMovie from "./components/SearchMovie/SearchMovie";


import NumbPuzzle from "./components/NumbPuzzle/NumbPuzzle";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import MySandbox from "./components/_MySandbox/MySandbox";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends Component {
    catchAllUnhandledErrors = (reason, promise) => {
        alert('Some Error')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Redirect from="/profile" to="/"/>
                        <Route exact path='/dialogs'
                               render={() => {
                                   return <React.Suspense fallback={<div>Загрузка...</div>}>
                                       <DialogsContainer/>
                                   </React.Suspense>
                               }}/>

                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route exact path='/'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='/news'
                               render={() => <NewsContainer/>}/>
                        <Route path='/game'
                               render={() => <GameContainer/>}/>
                        <Route path='/numbGame'
                               render={() => <NumbgameContainer/>}/>
                        <Route path='/sandBox'
                               render={() => <SandBox/>}/>
                        <Route path='/sandBox2'
                               render={() => <SandBox2/>}/>
                        <Route path='/myIP'
                               render={() => <MyIP/>}/>
                        <Route path='/myTodoList'
                               render={() => <ToDoList/>}/>
                        <Route path='/flowWindow'
                               render={() => <FlowWindowContainer/>}/>
                        <Route path='/searchMovie'
                               render={() => <SearchMovie/>}/>
                        <Route path='/numbPuzzle'
                               render={() => <NumbPuzzle/>}/>
                        <Route path='/memoryGame'
                               render={() => <MemoryGame/>}/>
                        <Route path='/MySandbox'
                               render={() => <MySandbox/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>

                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        {/*Компонент из React-Redux  добавляет этот стор в контекст с помощью контекста API*/}
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;
