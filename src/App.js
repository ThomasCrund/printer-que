import React from 'react';
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import FileDashboard from "./components/FileDashboard";
import FileList from "./components/FileList";
import Empty from "./components/Empty";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Job from './components/job';


class App extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
     
        const { cookies } = props;
        this.state = {
            token: cookies.get('token') || ''
        };
    }

    render() {
        return (
            <BrowserRouter>
            <React.Fragment>
                <main>
                    <Header tokenHandle={this.sessionToken} />
                    <Sidebar />
                    <Switch>
                        <Route path="/" exact component={Dashboard}/>
                        <Route path="/jobs/new" exact component={FileDashboard}/>
                        <Route path="/jobs" exact> <FileList token={this.state.token}/> </Route>
                        <Route path="/jobs/:id" exact> <Job token={this.state.token}/> </Route>
                        <Route path="/shapes" exact component={Empty}/>
                    </Switch>
                </main>
            </React.Fragment>
            </BrowserRouter>
        );
    }

    sessionToken = (token) => {
        const { cookies } = this.props;
 
        cookies.set('token', token, { path: '/' });
        this.setState({ token });
    }
};

export default withCookies(App);
