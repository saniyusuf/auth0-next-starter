import React from 'react';
import Auth from '../services/auth';
import Router from 'next/router'

const auth0 = new Auth();
class SignIn extends React.Component {

    componentDidMount(){
        if (auth0.isAuthenticated()){
            Router.push('/');
        } else {
            auth0.login();
        }
    }

    render(){
        return(
            <div>
                <p>Redirecting You To Log In</p>
            </div>
        )
    }

}

export default SignIn
