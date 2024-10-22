import React, { useEffect } from 'react'
import { useDoctorContext } from '../../context/DoctorContext'
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {

  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useDoctorContext();
  const { calculateAge, slotDateFormate,currency} = useAppContext();

  useEffect(() => {
    if (dToken) {
      getAppointments()
    } 
  },[dToken])

  return (
    <div className="w-full  max-w-6xl p-5 dark:bg-[#0A2238]">
      <p className="mb-3 text-lg dark:text-white font-medium">
        All Appointments
      </p>

      <div className="bg-white dark:bg-[#091c2e] border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden dark:text-gray-200 grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap items-center justify-between max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1  text-gray-500 dark:text-gray-100 py-3 px-6 border-b"
            key={index}
          >
            <p className="font-bold max-sm:hidden">{index + 1}</p>
            <div className="flex gap-2 items-center">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="font-bold max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </p>
            <p>
              {slotDateFormate(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.docData.fees}
            </p>
            {item.cancelled ? (
              <p className='text-red-600 text-xs font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-blue-500 text-xs font-medium'>Completed</p>
            ) : (
              <div className="flex gap-1 items-center">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments
