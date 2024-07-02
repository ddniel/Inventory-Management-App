import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiImageOff } from "react-icons/ci";
import { useEffect, useRef } from "react";

export default function ProductForm({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleImageChange,
  handleInputChange,
  saveProduct,
}) {
  return (
    <div className="bg-gray-80 rounded-lg px-6 py-6 mb-4">
      <form className="flex gap-10" onSubmit={saveProduct}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pr-14">
            <label htmlFor="">Product Name</label>
            <input
              type="text"
              name="name"
              value={product?.name}
              onChange={handleInputChange}
              className="bg-blue-100 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex justify-between pr-14">
            <label htmlFor="">Product Category</label>
            <input
              type="text"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
              className="bg-blue-100 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex justify-between pr-14">
            <label htmlFor="">Product Price</label>
            <input
              type="text"
              name="price"
              value={product?.price}
              onChange={handleInputChange}
              className="bg-blue-100 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex justify-between pr-14">
            <label htmlFor="">Product Quantity</label>
            <input
              type="text"
              name="quantity"
              value={product?.quantity}
              onChange={handleInputChange}
              className="bg-blue-100 rounded-sm px-2 py-1"
            />
          </div>
          <br />
          <div>
            <label htmlFor="">Product Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
              className="bg-blue-100 w-[550px] h-[300px] overflow-scroll"
            />
          </div>

          <div>
            <button
              className="bg-blue-600 text-white font-medium text-sm rounded-lg px-2.5 py-2 cursor-pointer hover:bg-blue-500 tracking-wide my-4"
              type="submit"
            >
              Save Product
            </button>
          </div>
        </div>

        <div className=" w-full flex flex-col items-center">
          <label htmlFor="">Product Image</label>
          <code className="text-gray-400 text-sm italic">
            Supported Formats: jpg, jpeg, png
          </code>
          <br />
          <input
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
          <br />
          <div className="flex w-[300px] h-[300px] overflow-auto items-center justify-center border-gray-400 border-dashed border-2">
            {imagePreview != null ? (
              <img src={imagePreview} alt="Product Image" />
            ) : (
              <CiImageOff size={40} className="text-gray-400" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
