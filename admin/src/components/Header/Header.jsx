import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";

function Header({ darkMode, toggleDarkMode, toggleSidebar }) {
  const { aToken, setAToken } = useAdminContext();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center justify-start rtl:justify-end">
            <button
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <div className="flex flex-1 justify-between items-center px-4 ">
              <div className="flex items-center gap-2 text-xs">
                <img
                  className="w-36 sm:w-40 cursor-pointer"
                  src={assets.admin_logo}
                  alt=""
                />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 dark:text-gray-200 ">
                  {aToken ? "Admin" : "Doctor"}
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-primary text-white text-sm px-10 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
          <button
            className=" dark:bg-slate-50 dark:text-slate-700 rounded-full p-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
