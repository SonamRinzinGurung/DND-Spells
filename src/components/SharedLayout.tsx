import { Outlet } from "react-router-dom";
import { NavBar } from ".";

const SharedLayout = () => {
  return (
    <div className="mb-10 mt-6">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
