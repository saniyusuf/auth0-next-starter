import React from 'react';
import Auth from '../services/auth';


const auth0 = new Auth();

class Callback extends React.Component {
    componentDidMount(){
        auth0.handleAuthentication()
    }

    render(){
        return(
            <div>
                <p>Some Loader Here</p>
            </div>
        )
    }

}

export default Callback
