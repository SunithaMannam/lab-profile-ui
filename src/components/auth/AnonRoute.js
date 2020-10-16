import React from 'react'
import { Route, Redirect } from "react-router-dom";

const AnonRoute = (properties)=> {
  const { component: Component,isAuthenticated ,setAuthStatus} = properties;

    return (         
            <Route 
                render={(props) =>
          isAuthenticated ? <Redirect to="/" /> : <Component {...props} setAuthStatus={setAuthStatus} />   }
            />      
    )
}

 

export default AnonRoute;