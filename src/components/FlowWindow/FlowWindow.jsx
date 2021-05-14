import React, {Component} from 'react'
import s from './FlowWindow.module.css';
import comboStyle from 'classnames';


class MenuButton extends Component {
    render() {
        return <button className={s.roundButton}
                       onMouseDown={this.props.handleMouseDown}>
            Х
        </button>;
    }
}

class Menu extends Component {
    render() {
        return <div
            className={(this.props.menuVisibility) ? comboStyle(s.flyoutMenu, s.show) : comboStyle(s.flyoutMenu, s.hide)}
            onMouseDown={this.props.handleMouseDown}
        >
            <h2><a href="#">Main</a></h2>
            <h2><a href="#">About</a></h2>
            <h2><a href="#">Contact</a></h2>
            <h2><a href="#">Search</a></h2>
        </div>
    }
}

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        // this.handleMouseDown = this.handleMouseDown.bind(this)
    }
    handleMouseDown(e) {
        this.setState({
            visible: !this.state.visible
        })
        console.log('clicked');
        console.log(this.state);
        e.stopPropagation()
    }

    render() {
        return (
            <div className={s.menuContainer}>
                <MenuButton handleMouseDown={(e)=>this.handleMouseDown(e)}/>
                <Menu handleMouseDown={(e)=>this.handleMouseDown(e)}
                      menuVisibility={this.state.visible}/>
                <div>
                    <p>Найдешь пункт, который здесь лишний?</p>
                    <ul>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Dolor</li>
                        <li>Sit</li>
                        <li>Bumblebees</li>
                        <li>Aenean</li>
                        <li>Consectetur</li>
                    </ul>
                </div>
            </div>
        );
    }
}


let FlowWindowContainer = () => <div>
    <MenuContainer/>
</div>


export default FlowWindowContainer;


