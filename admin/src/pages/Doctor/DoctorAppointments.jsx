import React, { useEffect } from 'react'
import { useDoctorContext } from '../../context/DoctorContext'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments } = useDoctorContext();

  useEffect(() => {
    if (dToken) {
      getAppointments()
    } 
  },[dToken])

  return (
    <div className="w-full  max-w-6xl p-5 dark:bg-[#0A2238]">
      <p className="mb-3 text-lg dark:text-white font-medium">All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments
