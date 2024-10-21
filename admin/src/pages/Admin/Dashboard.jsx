import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { getDashData, dashData, aToken, cancelAppointment } =
    useAdminContext();

  const { slotDateFormate } = useAppContext();

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="p-5 w-full dark:bg-[#0E1424] dark:text-white">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white dark:bg-[#192442] p-4 min-w-52 rounded border-2 border-gray-600 cursor-pointer hover:scale-105 transition-all  ">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              {dashData?.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
            <p></p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-[#192442] p-4 min-w-52 rounded border-2 border-gray-600 cursor-pointer hover:scale-105 transition-all  ">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              {dashData?.appointment}
            </p>
            <p className="text-gray-400">Appointments</p>
            <p></p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-[#192442] p-4 min-w-52 rounded border-2 border-gray-600 cursor-pointer hover:scale-105 transition-all  ">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              {dashData?.patients}
            </p>
            <p className="text-gray-400">Patients</p>
            <p></p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0E1424]">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img className="w-14  " src={assets.list_icon} alt="" />
          <p className="font-semibold "> Latest Bookings</p>
        </div>

        <div className="pt-4 h-[50vh] border border-t-0 overflow-y-scroll">
          {dashData?.latestAppointments?.map((item, index) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-600 "
              key={index}
            >
              <img className="w-14" src={item.docData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 dark:text-gray-100  font-medium">
                  {item?.docData?.name}
                </p>
                <p className="text-gray-800 dark:text-gray-100  ">
                  {slotDateFormate(item?.slotDate)}
                </p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
