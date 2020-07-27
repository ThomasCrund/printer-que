import React from 'react'
import { Route, Redirect } from 'react-router-dom'


function PrivateRoute ({component: Component, token, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => token !== ""
          ? <Component {...props} token={token} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

export default PrivateRoute