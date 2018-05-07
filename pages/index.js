import React from 'react';
import Auth from '../services/auth';
const auth0 = new Auth();

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
      }

      componentDidMount(){
        this.setState({
          isAuthenticated: auth0.isAuthenticated()
        })
      }

  authenticate(){
    auth0.login();
  }


  render(){
    return(
      <div>
        <p>Hello there, Welcome to your great application</p>
          {!this.state.isAuthenticated && (
              <button onClick={this.authenticate}>Sign In</button>
          )}
          {this.state.isAuthenticated && (
              <button onClick={this.authenticate}>Log Out</button>
          )}
      </div>
    )
  }

}

export default Index
