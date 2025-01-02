import axios from "axios";

import{toast} from 'sonner';
import {API_URL} from "";

export const authLogin = async (email, password) => {
    try {
      const response = await axios.post(API_URL + "/auth/login", {
        email: email,
        password: password
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  
export const authSignup = async (name, email, password, comfirmPassword) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name: name,
      email: email,
      password: password,
      comfirmPassword: comfirmPassword,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};