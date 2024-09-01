import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import Loader, { SpinnerImg } from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../services/authService";
import ChangePassword from "../components/ChangePassword";

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { email } = user;

  useEffect(() => {
    // Send user to profile page if refreshes the page, because redux data gets lost if so.
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //Image upload

      let imageURL;
      if (
        profileImg &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloud_name");
        image.append("upload_preset");

        //Save img to cloudinary
        const response = await fetch(
          "https://api/cloudinary.com/v1_1/username/image/upload",
          { method: "post", body: image }
        );

        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      //Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageURL : profile.photo,
      };

      await updateUser(formData);

      toast.success("User updated");

      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        <h3>Edit Profile</h3>
        {isLoading && <Loader />}
        <>
          {!isLoading && profile === null ? (
            <p>Something went wrong, please reload...</p>
          ) : (
            <div className="w-full bg-slate-50 py-10 px-8 rounded-md shadow-md">
              <form onSubmit={saveProfile} className="w-1/2">
                <div className="flex flex-col gap-1">
                  <div className="mb-6">
                    <span>
                      <img src={user?.photo} alt="profile picture" />
                    </span>
                  </div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                    className=" rounded-sm px-2 py-1"
                  />

                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                    className=" rounded-sm px-2 py-1"
                  />

                  <label>Phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                    className=" rounded-sm px-2 py-1"
                  />

                  <label>Bio: </label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols={30}
                    rows={10}
                    className="rounded-sm px-2 py-1"
                  />

                  <label>Photo: </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
                <button className="bg-blue-600 text-white font-medium text-sm rounded-lg px-2.5 py-2 cursor-pointer hover:bg-blue-500 tracking-wide my-4">
                  Save
                </button>
              </form>
            </div>
          )}
          <ChangePassword />
        </>
      </Layout>
    </section>
  );
}
