import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props)=> {
  const { component: Component,isAuthenticated ,user, viewMyPokes,setAuthStatus} = props;

    return (
        <div>
            <Route render={() =>
          isAuthenticated ?
            <Component user={localStorage.getItem("accessToken") ? user : ""}
              isAuthenticated={isAuthenticated} viewMyPokes={viewMyPokes}
               setAuthStatus={setAuthStatus}            />
            : <Redirect to="/login" />
      }/>
        </div> 
    )
}
export default PrivateRoute;