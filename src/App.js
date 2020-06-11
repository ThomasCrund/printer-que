import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";




export default function NestingExample() {
  return (
    
    <Router>
      <div className="App">
      Printer Que Application
      <LoginButton/>
    </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/SignUp">Sign Up</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/SignUp">
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Options</h2>
      <ul>
        <li>
          <Link to={`${url}/Login`}>Login if you are already part of PrinterQue</Link>
        </li>
        <li>
          <Link to={`${url}/SignUp`}>Click here to SignUp</Link>
        </li>
        <li>
          <Link to={`${url}/What is this ?`}>What is PrinterQue?</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please don't go in my no no square</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
