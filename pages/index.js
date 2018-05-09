import React from 'react';
import Auth from '../services/auth';
import Menu from '../components/menu';

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
          <Menu isLoggedIn={this.state.isAuthenticated}/>
          <p>Hello there, Welcome to your great application</p>
      </div>
    )
  }

}

export default Index
