import React from 'react'
import { Route, Redirect } from 'react-router-dom'


function PrivateRoute ({component: Component, token, org, propsPass, errorHandle, orgPass, ...rest}) {
  return (
      <Route
        {...rest}
        render={(props) => token !== ""
          ? (org ? <Component {...props} token={token} orgPass={orgPass} errorHandle={errorHandle} propsPass={propsPass} /> : <Redirect to={{pathname: '/org', state: {from: props.location}}} />)
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

export default PrivateRoute