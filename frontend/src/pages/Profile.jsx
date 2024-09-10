import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { getUser } from "../services/authService";
import { SET_NAME, SET_USER } from "../redux/features/auth/authSlice";
import { SpinnerImg } from "../components/Loader";
import { Link } from "react-router-dom";

export default function Profile() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        {isLoading && <SpinnerImg />}
        <>
          {!isLoading && profile === null ? (
            <p>Something went wrong, please reload...</p>
          ) : (
            <div className="w-full bg-slate-50 py-10 px-8 rounded-md shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="mr-20">
                  <span>
                    <img src={profile?.photo} alt="profile picture" />
                  </span>
                </div>
                <div>
                  <span>
                    <p>
                      <b>Name: </b>
                      {profile?.name}
                    </p>
                  </span>
                  <span>
                    <p>
                      <b>Email: </b>
                      {profile?.email}
                    </p>
                  </span>
                  <span>
                    <p>
                      <b>Phone: </b>
                      {profile?.phone}
                    </p>
                  </span>
                  <span>
                    <p>
                      <b>Bio: </b>
                      {profile?.bio}
                    </p>
                  </span>
                </div>
              </div>
              <div>
                <Link to="/edit-profile">
                  <button className="bg-blue-600 text-white font-medium text-sm rounded-lg px-2.5 py-2 cursor-pointer hover:bg-blue-500 tracking-wide my-4">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      </Layout>
    </section>
  );
}
