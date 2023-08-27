import axios from "axios";
import * as jose from "jose";
import Swal from "sweetalert2";
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
    const response = await axios.put(`${baseURL}/intern/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const getListIntern = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/intern/list/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
export const getInternById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/intern/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
export const createIntern = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/intern/create/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const updateIntern = async (id, data) => {
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
export const getListClient = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/client/list/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};

//service abonnement
export const getListServiceAbonnement = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/service-abonnement/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
export const getListServiceAbonnementActif = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/service-abonnement/actif/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
export const getServiceAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/service-abonnement/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
export const createServiceAbonnement = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/service-abonnement/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const updateServiceAbonnement = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/service-abonnement/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const removeServiceAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/service-abonnement/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.response?.data.errors.message,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
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

//manage files and audio
export const UploadFile = async (data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/files/upload`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const readFile = async (fileName) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/files/download/${fileName}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const UpdateFile = async (fileName, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/files/upload/${fileName}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const removeFile = async (fileName) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/files/remove/${fileName}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

