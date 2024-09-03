import logo from "/logo.png";
import features from "/features.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/LandingFooter";
import { ShowOnLogin, ShowOnLogout } from "../../components/HiddenLinks";

export const Home = () => {
  return (
    <section className="h-full lg:h-screen relative">
      <div className="px-5 py-2 md:px-20 md:py-10 m-auto h-full">
        <nav className="flex flex-row w-full justify-between">
          <div className="flex items-center">
            <img className="w-10" src={logo} alt="" />
            <h1 className="md:text-xl font-medium pl-2">Inventory Manager</h1>
          </div>
          <ul className="flex flex-row items-center gap-2">
            <ShowOnLogout>
              <li>
                <Link
                  to="/register"
                  className="font-medium text-sm cursor-pointer"
                >
                  Register
                </Link>
              </li>
            </ShowOnLogout>

            <ShowOnLogout>
              <li>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </li>
            </ShowOnLogout>

            <ShowOnLogin>
              <li>
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>

        {/* Hero Section */}

        <div className="flex flex-col mt-14 items-center text-center h-5/6 gap-20 lg:flex-row lg:text-left">
          <div>
            <h3 className="text-gray-500 pl-5">- Free 30 days trial</h3>
            <h1 className="text-4xl md:text-7xl">
              Handle your inventory like a Pro.
            </h1>
            <p className="text-gray-700 text-sm py-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, iste? Voluptatum labore, atque minima rerum
              accusantium laborum dolores optio nulla exercitationem suscipit
              dicta? Eos ipsam reiciendis quam, consequatur sit voluptates!
            </p>
            <ShowOnLogout>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </ShowOnLogout>
          </div>

          <div>
            <img className="mt-10 md:max-w-2xl" src={features} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
