import InfoCard from "./InfoCard";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import { AiFillDollarCircle } from "react-icons/ai";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../redux/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Format Amount
export function FormatNumbers(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ProductSummary({ products }) {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="mb-8 w-full">
      <h3>Inventory Summary</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 mt-6">
        <InfoCard
          icon={<BsFillCartCheckFill size={42} color="white" />}
          title={"Total Products"}
          count={products.length}
        />
        <InfoCard
          icon={<AiFillDollarCircle size={42} color="white" />}
          title={"Total Value"}
          count={`$ ${FormatNumbers(totalStoreValue.toFixed(2))}`}
        />
        <InfoCard
          icon={<BsCartXFill size={42} color="white" />}
          title={"Out of Stock"}
          count={outOfStock}
        />
        <InfoCard
          icon={<TbCategoryFilled size={42} color="white" />}
          title={"Categories"}
          count={category.length}
        />
      </div>
    </div>
  );
}
