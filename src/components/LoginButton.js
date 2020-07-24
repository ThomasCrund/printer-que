import React, { Component } from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import axios from 'axios';

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loggedIn": true,
        }
    }

    render() {
        let button;

        if (this.state.loggedIn === false) {
            button = (<GoogleLogin
                clientId="352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.onSignIn}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />)
        } else {
            button = (<GoogleLogout
                clientId="352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com"
                onLogoutSuccess={this.onLogOut}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />)
        }

        return (
            <div>
                {button}
            </div>
        )
    }

    onSignIn = (googleUser) => {
        this.props.tokenHandle("This is a test");
        var profile = googleUser.getBasicProfile();
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;

        axios.post('/api/auth/login', 
            { token: id_token})
        .then((response) => {
            console.log(response);
            this.props.tokenHandle(response.data.sessionToken);
        })
        .catch((error) => {
            console.log(error);
            this.setState({"loggedIn": false,})
        });

        this.setState({"loggedIn": true,})

    }

    onLogOut = (data) => {
        console.log(data);
        this.setState({"loggedIn": false,})
    }
    
    onFailure = (err) => {
        console.log("Google Login Error: " + err.details);
        console.log(err);
        this.setState({"loggedIn": false,})
    }
}
