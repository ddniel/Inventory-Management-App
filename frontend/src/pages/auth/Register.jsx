import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cpassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function register(e) {
    //Prevent reloading the page when the form is sent
    e.preventDefault();

    //FrontEnd validation
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be more than 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== cpassword) {
      return toast.error("Passwords do not match");
    }

    const userData = { name, email, password };

    setIsLoading(true);

    try {
      await registerUser(userData);
      setIsLoading(false);
      toast.success("Account created succesfuly.");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }

  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      {isLoading && <Loader />}
      <Card>
        <h2 className="text-xl lg:text-2xl">Register</h2>
        <form
          onSubmit={register}
          className="flex flex-col items-center w-full mt-4 mb-3"
        >
          <input
            required
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full"
          />
          <input
            required
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full"
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full"
          />
          <input
            required
            type="password"
            placeholder="Confirm password"
            name="cpassword"
            value={cpassword}
            onChange={handleInputChange}
            className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6"
          />
          <Button>Register</Button>
        </form>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer hover:underline">
            Login
          </Link>
        </p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  );
}
