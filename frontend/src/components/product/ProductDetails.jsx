import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar";
import Layout from "../Layout";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getProduct } from "../../redux/features/products/productSlice";
import DOMPurify from "dompurify";

import Loader from "../Loader";

export default function ProductDetails() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="text-green-600">In Stock</span>;
    }
    return <span className="text-red-600">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        <h3>Product Details</h3>
        {isLoading && <Loader />}
        {product && (
          <div className="flex flex-cols w-full bg-slate-50 py-10 px-8 rounded-md shadow-md">
            <div className="w-1/2">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                ></img>
              ) : (
                <p>No image set for this product.</p>
              )}
            </div>

            <div className="flex flex-col gap-2 ml-10">
              <h4 className="text-xl font-medium">{product.name}</h4>
              <hr />
              <h4>{stockStatus(product.quantity)}</h4>
              <p className="text-sm italic text-gray-500">SKU: {product.sku}</p>
              <span>$ {product.price}</span>

              <span>
                <b>Stock:</b> {product.quantity}
              </span>

              <span>
                <b>Total value:</b> $ {product.quantity * product.price}
              </span>

              <span>
                <b>Category: </b>
                {product.category}
              </span>
              <div className="mt-4">
                <hr />
                <p className="mt-2">
                  <strong>Description: </strong>
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-4">
                <hr className="mb-2" />
                <code>
                  Created on: {product.createdAt.toLocaleString("en-US")}
                </code>
                <br />
                <code>
                  Last Update: {product.updatedAt.toLocaleString("en-US")}
                </code>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </section>
  );
}
