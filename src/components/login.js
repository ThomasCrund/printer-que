import React from "react";
import LoginButton from "./LoginButton";

import { Redirect } from "react-router-dom";


class login extends React.Component {

    render() {
        console.log("Test")
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginLeft: "100px"
            }}>
                <div style={{ display:"grid", justifyItems:"center" }}>
                    <h4 style={{ marginBottom: "20px" }}>Login With Google to proceed</h4>
                    {this.props.token !== "" ? <Redirect to="/"></Redirect> : null} 
                    <LoginButton tokenHandle={this.sessionToken} loggedIn={false}></LoginButton>
                </div>
            </div>
        )
    }

    sessionToken = (token, loggedIn) => {
        //console.log(token);
        this.props.tokenHandle(token, loggedIn);
    }
}

export default login;