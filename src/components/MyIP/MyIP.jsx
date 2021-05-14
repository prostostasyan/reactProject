import React, {Component} from 'react'
import s from './MyIP.module.css';
import axios from 'axios';


class MyIP extends Component {
    constructor() {
        super();
        this.state = {
            ip_adress: ''
        }
    }

    componentDidMount() {
        axios.get('https://api.ipify.org?format=jsonp&callback=?')
            .then((response) => {
                const data = response.data.replace(/[^.0-9]/gim, '');
                console.log(data)
                this.setState({
                    ip_adress: data
                })
            })
            .catch((error) => {
                this.setState({
                    ip_adress: 'Херас два'
                })
                if (error.response) {
                    console.log(error.response)
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }

    render() {
        return <div className={s.containerId}>
            <h1 className={s.myIp}>{this.state.ip_adress}</h1>
        </div>

    }
}


let MyIPContainer = () => <div className={s.bg}>
    <MyIP/>
    <p className={s.advance}>(Это Ваш IP-адрес)</p>
</div>


export default MyIPContainer;


