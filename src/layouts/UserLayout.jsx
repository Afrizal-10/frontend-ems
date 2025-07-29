import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
