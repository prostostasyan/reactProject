import React from 'react';
import s from './SandBox2.module.css';
// import comboStyle from 'classnames';
import { render, unmountComponentAtNode } from 'react-dom'

const {Component} = React



const getFakeMembers = (count) => new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}`
    const request = new XMLHttpRequest()
    request.open('GET', api)
    request.onload = () => (request.status == 200) ?
        resolves(JSON.parse(request.response).results) :
        rejects(Error(request.statusText))
    request.onerror = (err) => rejects(err)
    request.send()
})


const Member = ({email, picture, name, location}) => {
    return <div className={s.member}>
        <img src={picture.thumblenail} alt=''/>
        <h1>{name.first}{name.last}</h1>
        <p><a href={"mailto: + email"}>{email}</a></p>
        <p>{location.city}, {location.state}</p>
    </div>
}

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            loading: false,
            error: null
        }
    }

    componentWillMount() {
        this.setState({loading: true})
        getFakeMembers(this.props.count).then(
            members => {
                this.setState({members, loading: false})
            },
            error => {
                this.setState({error, loading: false})
            }
        )
    }

    componentWillUpdate() {
        console.log('update lifecycle')
    }

    render() {
        const {members, loading, error} = this.state

        return <div className={s.memberList}>
            {(loading) ?
                <span>Loading Members</span> :
                (members.length) ?
                    members.map((user, i) => <Member key={i} {...user} />
                    ) :
                    <span>0 members loaded...</span>
            }
            {(error) ? <p>Error Loading Members: error</p> : ''}
        </div>
    }
}




class SandBox2 extends React.Component  {

    render() {
        return <div>
            <MemberList/>
        </div>
    }
}

export default SandBox2;


