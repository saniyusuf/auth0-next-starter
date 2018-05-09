import React from 'react';
import Auth from '../services/auth';
import Router from 'next/router'


const auth0 = new Auth();

class LogOut extends React.Component {
    componentDidMount () {
        auth0.logout();
        Router.push('/');
    }

    render(){
        return(
            <div>
                <p>Please Wait While You Are Logged Out</p>
            </div>
        )
    }

}

export default LogOut
