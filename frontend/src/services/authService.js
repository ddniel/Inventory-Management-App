import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

//Register User

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData
    );
    if (response.statusText === "OK") {
      toast.success("User Registered succesfully");
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Login User

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
    if (response.statusText === "OK") {
      toast.success("Login Succesful...");
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Logout User

export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);
    localStorage.removeItem("token");
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Forgot password

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotpassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Reset password

export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/reset-password/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login status
export const getLoginStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Is logged in? ", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Get User Profile

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/users/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Update User

export const updateUser = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/updateuser`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Change Password

export const changePassword = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/changepassword`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.msg &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
