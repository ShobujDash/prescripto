import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const { aToken } = useAdminContext();

  return (
    <div className="min-h-[90.5vh] dark:bg-[#0E1424] bg-white dark:text-white border-red-100 ">
      {aToken && (
        <ul className="text-[#515151] mt-5 ">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="dark:text-white">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/all-apointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="dark:text-white">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="dark:text-white">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="dark:text-white">Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
