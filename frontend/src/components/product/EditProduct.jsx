import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/products/productSlice";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import Loader from "../Loader";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  const productToEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productToEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productToEdit);

    setImagePreview(
      productToEdit && productToEdit.image
        ? `${productToEdit.image.filePath}`
        : null
    );

    setDescription(
      productToEdit && productToEdit.description
        ? productToEdit.description
        : ""
    );
  }, [productToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }
    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        {isLoading && <Loader />}
        <h3 className="font-semibold text-lg mb-6">Edit Product</h3>
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
