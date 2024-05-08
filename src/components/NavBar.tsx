import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-end">
      <div className="mr-4 flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold lg:text-lg hover:text-primaryDark  ${
              isActive
                ? "text-primaryDark p-0.25 border-b-2 border-red-800 "
                : "text-primary"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `font-semibold lg:text-lg hover:text-primaryDark ${
              isActive
                ? "text-primaryDark pb-0.25 border-b-2 border-red-800"
                : "text-primary"
            }`
          }
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
