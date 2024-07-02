import { useState } from "react";
import ProductForm from "../components/product/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

export default function AddProduct() {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();

    const SKU = letter + "-" + number;

    return SKU;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("sku", generateSKU(product.category));
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        {isLoading && <Loader />}
        <h3 className="font-semibold text-lg mb-6">Add New Product</h3>
        <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleImageChange={handleImageChange}
          handleInputChange={handleInputChange}
          saveProduct={saveProduct}
        />
      </Layout>
    </section>
  );
}
