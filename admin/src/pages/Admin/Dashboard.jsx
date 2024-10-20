import React, { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'

const Dashboard = () => {

  const { getDashData, dashData, aToken, cancelAppointment } =
    useAdminContext();
  
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  },[aToken])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
