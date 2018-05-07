import React from 'react';
import Auth from '../services/auth';

const auth0 = new Auth();

class SIgnIn extends React.Component {

    componentDidMount(){
        auth0.handleAuthentication()
    }

    render(){
        return(
            <div>
                <p>Sign In User</p>
            </div>
        )
    }

}

export default SIgnIn