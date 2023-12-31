import axios from "axios";
import * as jose from "jose";
import Swal from "sweetalert2";
import { baseURL } from "../../environnements/environnement";

//authentication
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
// user
export const updatePicture = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/user/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const listUser = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/user/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getByIdUser = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/user/id/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListInternChef = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/chefs`);
    return response.data;
  } catch (error) {}
};
export const getListLivreurs = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/intern/livreur/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListServiceAbonnementActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/services`);
    return response.data;
  } catch (error) {}
};
export const getServiceAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(
      `${baseURL}/service-abonnement/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    const response = await axios.post(
      `${baseURL}/service-abonnement/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    throw error.response?.data.errors.message;
  }
};
export const updateServiceAbonnement = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(
      `${baseURL}/service-abonnement/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    throw error.response?.data.errors.message;
  }
};
export const removeServiceAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(
      `${baseURL}/service-abonnement/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    throw error.response?.data.errors.message;
  }
};

//option abonnement
export const getListOptionAbonnement = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/option-abonnement/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    throw error.response?.data.errors.message;
  }
};
export const getListOptionAbonnementActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/options-service`);
    return response.data;
  } catch (error) {}
};
export const getOptionAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(
      `${baseURL}/option-abonnement/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const createOptionAbonnement = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/option-abonnement/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateOptionAbonnement = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(
      `${baseURL}/option-abonnement/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeOptionAbonnementById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(
      `${baseURL}/option-abonnement/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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

//categorie materiel
export const getListCategorieMateriel = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/categorie-materiel/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getCategorieMaterielById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(
      `${baseURL}/categorie-materiel/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const createCategorieMateriel = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/categorie-materiel/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateCategorieMateriel = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(
      `${baseURL}/categorie-materiel/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeCategorieMaterielById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(
      `${baseURL}/categorie-materiel/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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

//cour
export const getListCour = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/cour/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListCourActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/cours`);
    return response.data;
  } catch (error) {}
};
export const getLast3Cours = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/cour/last-cour/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
  }
};
export const getCourById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/cour/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getUserMessageCourById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(
      `${baseURL}/cour/message/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const createCour = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/cour/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateCour = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/cour/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeCourById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/cour/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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

//salle
export const getListSalle = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/salle/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListSalleActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/salles`);
    return response.data;
  } catch (error) {}
};
export const getSalleById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/v2/salles/${id}`);
    return response.data;
  } catch (error) {}
};
export const createSalle = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/salle/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateSalle = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/salle/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeSalleById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/salle/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListRepas = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/repas/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListRepasActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/repas`);
    return response.data;
  } catch (error) {}
};
export const getRepasById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/repas/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const createRepas = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/repas/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateRepas = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/repas/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeRepasById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/repas/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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

// materiel
export const getListMateriel = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/materiel/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const getListMaterielActif = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/materiels`);
    return response.data;
  } catch (error) {}
};
export const getMaterielById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/materiel/${id}/id/${data}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
export const createMateriel = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/materiel/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateMateriel = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/materiel/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeMaterielById = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(
      `${baseURL}/materiel/${id}/id/${data}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const readFile = async (fileName) => {
  try {
    const response = await axios.get(`${baseURL}/files/download/${fileName}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const UpdateFile = async (fileName, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/files/upload/${fileName}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
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
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getFile = async (url) => {
  try {
    const response = await readFile(url);
    const imgUrl = URL.createObjectURL(response);
    return imgUrl;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    console.error("Error displaying file:", error);
  }
};
//stripe
export const checkpaiementStripe = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/payment/create-payment-intent/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};

export const assignLivreurPayment = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(
      `${baseURL}/payment/assign-livreur/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};

export const confirmLivraisonPayment = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(
      `${baseURL}/payment/valided-livraison/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};

export const generateReceipt = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/payment/generate/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getListPayment = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/payment/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getByPaymentId = async (id, idk) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/payment/${id}/id/${idk}}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
//event
export const getListEvent = async (data, id) => {
  try {
    const response = await axios.get(
      `${baseURL}/v2/events/${data}/element/${id}`
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getListEventAll = async () => {
  try {
    const response = await axios.get(`${baseURL}/v2/events`);
    return response.data;
  } catch (error) {}
};
export const createEventReservation = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/event/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const createEventWithUserReservation = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/event/users/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const listEvent = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/event/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const listEventFutur = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/event/${id}/futur`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const infoEvent = async (id, idk) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(
      `${baseURL}/event/${id}/participants/${idk}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeEvent = async (id, dat) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(
      `${baseURL}/event/${id}/element/${dat}`,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const removeEvenement = async (id, dat) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.delete(`${baseURL}/event/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateEvent = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/event/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
//event users
export const listEventUsers = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/event-users/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const updateEventUsers = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.put(`${baseURL}/event-users/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const checkEventUser = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/event-users/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
//post
export const addPost = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/post/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const getOnePost = async (id, idk) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/post/${id}/item/${idk}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
export const addComment = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/comment/${id}`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const sharePost = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(`${baseURL}/post/${id}/share`, data, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
export const loadPost = async (id) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/post/${id}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};

//like
export const checkLike = async (id, idk) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/like/${id}/post/${idk}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};
/**
 * Renvois les informations du user connecté
 */
export const getAuthUser = () => {
  let user = {
    id: JSON.parse(localStorage.getItem("auth"))?.token.id,
    name: JSON.parse(localStorage.getItem("auth"))?.token.name,
    picture: JSON.parse(localStorage.getItem("auth"))?.token.picture,
    role: JSON.parse(localStorage.getItem("auth"))?.token.role,
    sub: JSON.parse(localStorage.getItem("auth"))?.token.sub,
    subscription: JSON.parse(localStorage.getItem("auth"))?.token.subscription,
  };
  return user;
};
export const deconnect = () => {
  localStorage.clear();
};
//like
export const giveAvis = async (id, idk) => {
  try {
    const response = await axios.get(`${baseURL}/v2/paiment/${id}/note/${idk}`);
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
    throw error.response?.data;
  }
};
export const getAvisExist = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/v2/avis/${id}`);
    return response.data;
  } catch (error) {}
};

export const saveSubscription = async (id, data) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.post(
      `${baseURL}/payment/abonnement/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${userToken.userToken}` },
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};

export const checkPermissionCour = async (id, idk) => {
  try {
    const tokenString = localStorage.getItem("auth");
    const userToken = JSON.parse(tokenString);
    const response = await axios.get(`${baseURL}/cour/${id}/cour/${idk}`, {
      headers: { Authorization: `Bearer ${userToken.userToken}` },
    });
    return response.data;
  } catch (error) {
    if (
      error.response?.status === 500 &&
      error.response?.data.message.includes("JWT expired")
    )
      return deconnect();
    throw error.response?.data;
  }
};