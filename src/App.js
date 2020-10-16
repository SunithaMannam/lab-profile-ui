import React, { Component } from 'react';
import { Link,Route,BrowserRouter,Switch } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { validateSession } from "./services/userService";

import Signup from "./views/Signup";
import Login from "./views/Login";
import Profile from "./views/Profile";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

class App extends Component {
    state = {
      isAuthenticated: false,
      user: {},
    }
  
  setAuthStatus = (user,isAuth=true) => {
       console.log( "setAuth Status: ", user)
      this.setState({
        isAuthenticated:isAuth,
        user,
      });
    };
    
  /** */
    componentDidMount = () => {
      console.log(" componentDidMount->App.js->")
      
       const accessToken = localStorage.getItem("accessToken");
      
       if (accessToken) {
       console.log(" localstorage : ",accessToken);
      validateSession(accessToken)
        .then((response) => {
          if (response.session ) {
             console.log( "RESPONSE",response );
          this.setAuthStatus(response.session.userId);
          } else {
            this.setState({ isAuthenticated: false });
            console.log(" local accesstoken removed as session doenot exist at server ")
          }
         
        })
        .catch((err) => console.log(err));
    }
     };
  
  render() {
    const {isAuthenticated} = this.state;
    return (
      <div>
        <BrowserRouter>
         {!isAuthenticated && <Link className="btn btn-primary" to="/signup"> Signup </Link>  }
         {!isAuthenticated && <Link className="btn btn-primary" to="/login"> Login </Link>  }
          
          <Switch>
             <AnonRoute
            exact isAuthenticated={isAuthenticated} 
            setAuthStatus = {this.setAuthStatus}             
            path="/signup" 
            component={Signup}
            />
              <AnonRoute
            exact isAuthenticated={isAuthenticated} 
            setAuthStatus = {this.setAuthStatus}             
            path="/login" 
            component={Login}
            />
            <PrivateRoute
              exact
              path="/" isAuthenticated={isAuthenticated}  
              setAuthStatus = {this.setAuthStatus}     
              user={localStorage.getItem("accessToken") ? this.state.user :""}
            component={Profile}
          />
            
          </Switch>
        </BrowserRouter>          
      </div>
    )
  }
}


export default App;