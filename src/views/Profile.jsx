import React, { Component } from 'react';
import {
  addProfilePicture,
  userLogout,
  editProfile,
} from '../services/userService';
import { Link } from 'react-router-dom';

class Profile extends Component {
  state = {
    username: this.props.username,
    campus: this.props.campus,
    course: this.props.course,
    image: this.props.image || '',
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  onImageUpload = (e) => {
    console.log(e.target.files[0]);
    addProfilePicture(
      e.target.files[0],
      localStorage.getItem('accessToken')
    ).then((image) => {
      console.log(resp);
      this.setState({
        image,
      });
    });
  };

  handleLogout = () => {
    console.log(' logout clicked .');
    const token = localStorage.getItem('accessToken');
    userLogout(token)
      .then((resp) => {
        console.log('delete response : ', resp);
        // if (resp.success) {
        //     localStorage.clear();
        //     this.props.setAuthStatus({},false);
        // }
      })
      .catch((err) => console.log(err));
  };

  handleUpdate = (evt) => {
    evt.preventDefault();
    console.log(' Update profile clicked ... ');
    editProfile(this.state, localStorage.getItem('accessToken'))
      .then((editRes) => {
        console.log(' Edit profile result: ', editRes);

        if (editRes.accessToken) {
          console.log('profile edited successfully ');
        } else {
          this.setState({
            errorMessage: editRes.errorMessage,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.state);
    const { username, campus, course } = this.state;
    return (
      <div>
        <div className="edit-profile">
          <form onSubmit={this.handleUpdate}>
            <div className="form-group">
              <label>Username: </label>
              <input
                className="form-control"
                name="username"
                value={username}
                type="text"
                required={true}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Campus : </label>
              <select
                value={campus}
                name="campus"
                className="form-control"
                onChange={this.handleChange}
              >
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
              <select
                value={course}
                name="course"
                className="form-control"
                onChange={this.handleChange}
              >
                <option value="Web Dev">Web Dev</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
            <button className="btn btn-primary  w-25 justify-content-center">
              {' '}
              Update Profile{' '}
            </button>
          </form>

          <Link className="btn btn-danger" to={'/'} onClick={this.handleLogout}>
            Logout
          </Link>
        </div>
        <div className="picture">
          <img src={this.state.image} width="50" height="50" />
          <form>
            <input type="file" name="image" onChange={this.onImageUpload} />
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
