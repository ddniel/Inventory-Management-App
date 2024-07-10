/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";

export default function Search({ value, onChange }) {
  return (
    <div className="w-[300px] flex flex-row items-center border-solid border-[1px] border-gray-200 px-2">
      <IoSearch size={20} />
      <input
        type="search"
        placeholder="Search product..."
        value={value}
        onChange={onChange}
        className="px-2 py-1 w-full"
        style={{ outline: "none" }}
      />
    </div>
  );
}
