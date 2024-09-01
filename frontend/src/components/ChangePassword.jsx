import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  cPassword: "",
};

export default function ChangePassword() {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, cPassword } = formData;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();
    if (password != cPassword) {
      return toast.error("New passwords do not match.");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);

    toast.success(data);
    navigate("/profile");
  };

  return (
    <div className="mt-10 w-full bg-slate-50 py-10 px-8 rounded-md shadow-md ">
      <h3>Change Password</h3>
      <form
        onSubmit={changePass}
        className="flex flex-col gap-4 w-[300px] mt-4"
      >
        <input
          type="text"
          name="oldPassword"
          placeholder="Old Password"
          required
          value={oldPassword}
          onChange={handleInputChange}
          className=" rounded-sm px-2 py-1"
        />
        <input
          type="text"
          name="password"
          placeholder="New Password"
          required
          value={password}
          onChange={handleInputChange}
          className=" rounded-sm px-2 py-1"
        />
        <input
          type="text"
          name="cPassword"
          placeholder="Confirm New Password"
          required
          value={cPassword}
          onChange={handleInputChange}
          className=" rounded-sm px-2 py-1"
        />
        <div>
          <button
            className="bg-blue-600 text-white font-medium text-sm rounded-lg px-2.5 py-2 cursor-pointer hover:bg-blue-500 tracking-wide my-4"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
