import axios from "axios";
import * as jose from "jose";
import { baseURL } from "../../environnements/environnement";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    saveToken(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
function saveToken(userToken) {
  const decoded = jose.decodeJwt(userToken.token);
  let fonction = "";
  if (decoded.adress) fonction = decoded.adress;
  else fonction = decoded.fonction;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      token: decoded,
      status: true,
      userid: decoded.id,
      userName: decoded.name,
      fonction,
      userToken: userToken.token,
    })
  );
}

export const signup = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
// intern
export const updateProfilIntern = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/intern/update/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

// client
export const updateProfilClient = async (id, data) => {
    try {
      const tokenString = localStorage.getItem("auth");
      const userToken = JSON.parse(tokenString);
      const response = await axios.put(`${baseURL}/client/update/${id}`, data, {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data;
    }
  };

// repas
export const getRepasAvailable = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/repas/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
