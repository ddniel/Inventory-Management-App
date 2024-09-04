import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

const getToken = () => {
  return localStorage.getItem("token");
};

//Create New Product

const createProduct = async (formData) => {
  const token = getToken();
  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Get all products

const getProducts = async () => {
  const token = getToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Delete a product

const deleteProduct = async (id) => {
  const token = getToken();
  const response = await axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Get a product

const getProduct = async (id) => {
  const token = getToken();
  const response = await axios.get(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Update product

const updateProduct = async (id, formData) => {
  const token = getToken();
  const response = await axios.patch(`${API_URL}${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
