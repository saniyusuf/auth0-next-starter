import React from 'react';
import Link from 'next/link';


const buttonStyle = {
    margin: '10px',
    minWidth: '100px',
    minHeight: '50px',
    backgroundColor: '#44C7F4',
    color: '#000',
    fontWeight: 'bold'
};

const logOutButtonStyle = {
    backgroundColor: '#EB5424',
    fontWeight: 'bold',
    margin: '10px',
    minWidth: '100px',
    minHeight: '50px',
    color: '#fff',
};


class Menu extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Link href="/">
                    <button style={buttonStyle}>Home</button>
                </Link>
                <Link href="/profile">
                    <button style={buttonStyle}>Profile</button>
                </Link>
                {!this.props.isLoggedIn && (
                    <Link href="/sign-in">
                        <button style={buttonStyle}>Sign In</button>
                    </Link>
                )}
                {this.props.isLoggedIn && (
                    <Link href="/log-out">
                        <button style={logOutButtonStyle}>Log Out</button>
                    </Link>
                )}

            </div>
        )
    }

}

export default Menu
