import React, { Component } from 'react'
import { userSignUp } from "../services/userService";

export default class Signup extends Component {
     state = {
        username :"",
        password :"",
        campus :"",
        course :"",
  }
  
  handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [ name]:  value,
            })
  }
  
    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(" sign UP clicked ... ");
        userSignUp(this.state)
       .then((signupRes) => {
           console.log(" signup result: ", signupRes);
            
           if (signupRes.accessToken) {
               console.log(" access token recicev from signup request")
               localStorage.setItem("accessToken", signupRes.accessToken);
               this.props.setAuthStatus(signupRes.userRecord);
               this.props.history.push("/")
               console.log(" history: ", this.props.history);
           } else {
               this.setState({
                errorMessage: signupRes.errorMessage,
            })
           }             
      })
      .catch((err) => console.log(err));
  }
  
  render = () => {
      const { username, password, campus, course }  = this.state;
    return (
      <div className="App">
            <div className="form-group">
             <h2> Signup </h2>
          
                <form onSubmit={this.handleSubmit}>
            
                    <div className="form-group">
                        <label>Username: </label>
                    <input className="form-control"
                        name="username"
                        value={username}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>                    
                   
                    <div className="form-group">
                        <label>Password: </label>
                    <input className="form-control"
                        name="password"
                        value={password}
                        type="password"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    
                  <div className="form-group">
                    <label>Campus : </label>
                    <select  value={campus}
                        name="campus"    className="form-control"
                        onChange={this.handleChange}  >
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Miami">Miami</option>
                        <option value="Paris">Paris</option>
                         <option value="Berlin">Berlin</option>
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Sao Paulo">Sao Paulo</option>
                        <option value="Lisbon">Lisbon</option>
                        </select>
                  </div>
            
              <div className="form-group">
                <label>Course : </label>
                <select  value={course}
                    name="course"    className="form-control"
                    onChange={this.handleChange}  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="UX/UI">UX/UI</option>
                    <option value="Data Analytics">Data Analytics</option>                     
                    </select>
              </div>

              <button  className="btn btn-primary  w-25 justify-content-center"> Signup </button>
          </form>
           </div>
      </div>
    );
  }
}
