import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();

  return (
    <div className="h-screen dark:bg-[#0E1424] bg-white dark:text-white border-red-100 ">
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
            <img
              className="bg-white p-1 rounded-md"
              src={assets.home_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Dashboard</p>
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
            <img
              className="bg-white p-1 rounded-md"
              src={assets.appointment_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Appointments</p>
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
            <img
              className="bg-white p-1 rounded-md"
              src={assets.add_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Add Doctor</p>
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
            <img
              className="bg-white p-1 rounded-md"
              src={assets.people_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] ">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img
              className="bg-white p-1 rounded-md"
              src={assets.home_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img
              className="bg-white p-1 rounded-md"
              src={assets.appointment_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
                isActive
                  ? "bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-r-primary"
                  : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img
              className="bg-white p-1 rounded-md"
              src={assets.people_icon}
              alt=""
            />
            <p className="dark:text-white hidden md:block">Profile</p>
          </NavLink>

         
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
