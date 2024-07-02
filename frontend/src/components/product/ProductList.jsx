import { SpinnerImg } from "../Loader";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import styles from "./productList.module.css";

export default function ProductList({ products, isLoading }) {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div>
      <hr />
      <div>
        <div>
          <h3>Inventory Items</h3>
          <input type="text" />
        </div>
        {isLoading && <SpinnerImg />}

        <div className={styles.tableContainer}>
          {!isLoading && products.length === 0 ? (
            <p>No products to display.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td>
                        <span className={styles.action}>
                          <FaEye size={20} />
                          <FaRegEdit size={20} />
                          <FaTrash size={20} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
