import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export default class LoginButton extends Component {
    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onSignIn}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        )
    }

    onSignIn = (googleUser) => {

        var profile = googleUser.getBasicProfile();
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;

        axios.post('/api/auth/login', 
            { token: id_token})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    
    onFailure = (err) => {
        console.log("Google Login Error: " + err.details);
        console.log(err);
    }
}
