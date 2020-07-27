import React from "react";
import Classes from "../Style/header.module.css";
//import arrow from "../Assets/arrowDown.png";
//import bell from "../Assets/bell.png";
//import logout from "../Assets/logout.png";
import LoginButton from "./LoginButton";


class Header extends React.Component{
    render(){
        return (
            <header className={Classes.header}>
                <LoginButton tokenHandle={this.sessionToken} loggedIn={this.props.loggedIn} />
                {/*
                <div className={Classes.border}>
                    <img className={Classes.images} src={bell} alt="notifications"/>
                    <img className={Classes.images} src={logout} alt="logout"/>
                </div>*/}
            </header>
        );
    }

    sessionToken = (token, loggedIn) => {
        //console.log(token);
        this.props.tokenHandle(token, loggedIn);
    }
}

export default Header;