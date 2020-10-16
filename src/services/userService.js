import axios from 'axios';

const service = axios.create({ baseURL: "http://localhost:5000/"});

// signup 
export const userSignUp = (signupInfo) => {
    return service.post("auth/signup",signupInfo)
    .then((signUpResp) =>  signUpResp.data)
    .catch((error) => console.log(error));
}
 

// login 
export const userLogin = (loginDetails) => {
    return service.post("auth/login",loginDetails)
    .then((loginResp) =>   loginResp.data)
    .catch((error) => console.log(error));
}

// logout
export const userLogout = (accessToken) => {
  return service
    .delete(`auth/logout/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

// validate token
export const validateSession = (accessToken) => {
    console.log(" Validate user service called ");
    return service
    .get(`auth/loggedin/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};


// add profile picture
export const addProfilePicture = (image,token) => {
    const uploadData = new FormData();
    const headers = {
        'accessToken': token,
    };
    uploadData.append("imageUrl", image);
    return service
        .post("auth/upload", uploadData, {headers})
        .then( response   => response.data)
        .catch(console.error);
};

// edit profile 
export const editProfile = (editInfo, token ) => {
     const headers = {
        'accessToken': token,
    };
    return service.post("auth/edit", editInfo,{headers})
    .then((editResp) =>   editResp.data)
    .catch((error) => console.log(error));
}