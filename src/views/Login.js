import React, { Component } from 'react'
import { userLogin } from "../services/userService";
 
class Login extends Component {
    state = {
        username:"",
        password: "",
        errorMessage:"",
    }
    
    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("Login  clicked ... ");
        userLogin(this.state)
       .then((loginResp) => {
           console.log(" Login result: ", loginResp);
            
           if (loginResp.accessToken) {
               console.log(" access token recicev from login request")
               localStorage.setItem("accessToken", loginResp.accessToken);
               this.props.setAuthStatus(loginResp.userRecord);
               this.props.history.push("/")
               console.log(" history: ", this.props.history);
           } else {
               this.setState({
                errorMessage: loginResp.errorMessage,
            })
           }             
      })
      .catch((err) => console.log(err));
    }
    
    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [ name]:  value,
            })
    }
    
    render = () => {
        console.log( " Login props: : ", this.props)
     const {  username, password} = this.state;
        return (
            <div className="form-group">
                <h2> Login </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username : </label>
                    <input className="form-control"
                        name="username"
                        value={username}
                        type="username"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                    <input  className="form-control"
                        name="password"
                        value={password}
                        type="password"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    
          <button  className="btn btn-primary  w-25 justify-content-center"> Login </button>
                </form>
                <div> { this.state.errorMessage.length > 0 &&  this.state.errorMessage} </div>
            </div>
        )
    }
}

export default Login;