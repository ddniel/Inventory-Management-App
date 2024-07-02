import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import ProductList from "../components/product/ProductList";
import { getProducts } from "../redux/features/products/productSlice";

export default function Dashboard() {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        <ProductList products={products} isLoading={isLoading} />
      </Layout>
    </section>
  );
}
