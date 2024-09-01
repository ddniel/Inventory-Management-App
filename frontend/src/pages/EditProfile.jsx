import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import SideBar from "../components/SideBar";
import Layout from "../components/Layout";
import { SpinnerImg } from "../components/Loader";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);

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

  const saveProfile = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        <h3>Edit Profile</h3>
        {isLoading && <SpinnerImg />}
        <>
          {!isLoading && profile === null ? (
            <p>Something went wrong, please reload...</p>
          ) : (
            <div className="w-full bg-slate-50 py-10 px-8 rounded-md shadow-md flex flex-row">
              <form onSubmit={saveProfile}>
                <div className="flex flex-col gap-1">
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />

                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                  />

                  <label>Phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                  />

                  <label>Bio: </label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols={30}
                    rows={10}
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
              <div className="ml-20">
                <span>
                  <img src={user?.photo} alt="profile picture" />
                </span>
              </div>
            </div>
          )}
        </>
      </Layout>
    </section>
  );
}
