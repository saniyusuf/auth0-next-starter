import React from 'react';
import Auth from '../services/auth';
const auth0 = new Auth();

class Profile extends React.Component {

    componentDidMount(){
        auth0.handleAuthentication()
    }

    render(){
        return(
            <div>
                <p>Profile Of Some User. Very Secure Indeed</p>
            </div>
        )
    }

}

export default Profile
