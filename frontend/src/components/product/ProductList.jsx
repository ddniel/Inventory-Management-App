import { SpinnerImg } from "../Loader";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import styles from "./productList.module.css";
import Search from "../Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../redux/features/products/filterSlice";
import ReactPaginate from "react-paginate";

// eslint-disable-next-line react/prop-types
export default function ProductList({ products, isLoading }) {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  //-------------Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //----------End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div>
      <hr />
      <div className={styles.mainContainer}>
        <div>
          <h3>Inventory Items</h3>
        </div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        {isLoading && <SpinnerImg />}

        <div className={styles.tableContainer}>
          {!isLoading && filteredProducts.length === 0 ? (
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
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td className={styles.price}>
                        {"$"}
                        {price}
                      </td>
                      <td className={styles.quantity}>{quantity}</td>
                      <td className={styles.value}>
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
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={styles.paginationContainer}
          pageLinkClassName={styles.pageLinks}
          nextLinkClassName={styles.next}
          previousLinkClassName={styles.prev}
          activeLinkClassName={styles.activePage}
        />
      </div>
    </div>
  );
}
