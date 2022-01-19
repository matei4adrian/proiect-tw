import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleToggle = () => {
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="h-full">
      <header>
        <div className="px-4 py-2 text-white flex md:items-center justify-between bg-blue-900">
          <h1 className="font-bold">
            <a href="/">ShareTrip</a>
          </h1>
          <div
            className={
              toggleMenu
                ? "md:flex md:pt-0 pt-10 w-full md:w-auto"
                : "hidden md:flex"
            }
            id="menu"
          >
            <ul>
              <li className="md:inline-block cursor-pointer hover:text-gray-800 border-b md:border-none py-2 px-3">
                <a href="/">Home</a>
              </li>
              <li className="dropdown md:inline-block cursor-pointer hover:text-gray-800 border-b md:border-none py-2 px-3 relative">
                <a href="/my-experiences">My experiences</a>
              </li>
              <li className="dropdown md:inline-block cursor-pointer hover:text-gray-800 border-b md:border-none py-2 px-3 relative">
                <a href="/profile">Profile</a>
              </li>
              <li className="md:inline-block cursor-pointer text-red-500 hover:text-red-700 border-b md:border-none py-2 px-3">
                <button onClick={handleClickLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="cursor-pointer md:hidden">
            <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label
              className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
              htmlFor="menu-btn"
              onClick={handleToggle}
            >
              <div>
                <span className="navicon bg-white-darkest flex items-center relative"></span>
              </div>
            </label>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Navbar;
