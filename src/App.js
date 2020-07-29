import React from 'react';
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import FileDashboard from "./components/FileDashboard";
import FileList from "./components/FileList";
import {BrowserRouter,Route,Switch, Redirect} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Job from './components/job';
import PrivateRoute from './components/PrivateRoute';
import Axios from 'axios';
import Login from './components/login';
import NoOrg from './components/NoOrg';


class App extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
     
        const { cookies } = props;

        this.state = {
            token: cookies.get('token') || "",
            loggedIn: cookies.get('token') ? true : false,
            rank: "",
            inOrg: true,
            orgName: ""
        };
    }

    async componentDidMount() {
        await this.checkUserInfo();
    }

    checkUserInfo = async () => {
        try {
            var token = true;
            var orgInfo = await Axios.get("/api/org/", {headers: {'Authorization': this.state.token}})
        } catch (error) {
            token = false;
        }
        
        //console.log(orgInfo);
        if (token === false) {
            this.setState({ token: "", loggedIn: false });
        } else {
            if (orgInfo.data.inOrg === true) {
                this.setState({
                    inOrg: true,
                    rank: orgInfo.data.rank,
                    orgName: orgInfo.data.orgName
                })
            } else {
                this.setState({inOrg: false})
            }
        }
    }

    LoginRedirect = <Redirect to="/login"/>

    render() {
        console.log(this.state);
        
        return (
            <BrowserRouter>
            <React.Fragment>
                <main style={{ height: "100vh"}}>
                    <Header tokenHandle={this.sessionToken} loggedIn={this.state.loggedIn} />
                    <Sidebar />
                    <Switch>
                        <PrivateRoute path="/" exact token={this.state.token} org={this.state.inOrg} component={Dashboard} />
                        <PrivateRoute path="/jobs/new" exact token={this.state.token} org={this.state.inOrg} component={FileDashboard}/>
                        <PrivateRoute path="/jobs" exact token={this.state.token} org={this.state.inOrg} component={FileList} />
                        <PrivateRoute path="/jobs/:id" exact token={this.state.token} org={this.state.inOrg} component={Job} />
                        <PrivateRoute path="/org" exact token={this.state.token} org={true} propsPass={{ joinUpdate:this.handleOrgJoin}} orgPass={this.state.inOrg} component={NoOrg} /> 
                        <Route path="/login" exact render={(renderProps) => <Login {...renderProps} tokenHandle={this.sessionToken} token={this.state.token}/>} />
                    </Switch>
                </main>
            </React.Fragment>
            </BrowserRouter>
        );
    }

    sessionToken = (token, loggedIn) => {
        const { cookies } = this.props;
 
        cookies.set('token', token, { path: '/' });
        this.setState({ token, loggedIn });
    }

    handleOrgJoin = () => {
        this.checkUserInfo();
    }
};


export default withCookies(App);
