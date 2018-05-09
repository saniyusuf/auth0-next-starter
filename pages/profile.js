import React from 'react';
import Auth from '../services/auth';
const auth0 = new Auth();

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount(){
        this.setState({
            isAuthenticated: auth0.isAuthenticated()
        });
    }

    render(){
        return(
            <div>
                <p>Profile Of Some User. This is visible content. Secure content only seen below when logged in.</p>

                {this.state.isAuthenticated && (
                    <p> You are now logged in. To learn to use Auth0 to update your user metadata
                        , please visit the <a target="_blank" href="https://auth0.com/docs/metadata/management-api">official Auth0 Documentation.</a>
                    </p>
                )}
            </div>
        )
    }

}

export default Profile
