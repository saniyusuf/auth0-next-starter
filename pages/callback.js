import React from 'react';
import Auth from '../services/auth';
import Router from "next/router";


const auth0 = new Auth();

class Callback extends React.Component {
    componentDidMount(){
        if (auth0.isAuthenticated()){
            Router.push('/');
        } else {
            auth0.handleAuthentication()
        }
    }

    render(){
        return(
            <div>
                <p>Loading</p>
            </div>
        )
    }

}

export default Callback
