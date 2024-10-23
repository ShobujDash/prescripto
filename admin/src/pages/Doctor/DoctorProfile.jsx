import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useDoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, dToken, setProfileData, getProfileData, backendUrl } =
    useDoctorContext();
  const { currency } = useAppContext();

  const [isEdit, setIsEdit] = useState(false)
  
  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available:profileData.available
      }

      
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,{headers:{dToken}}
      );
      if (data?.success) {
        toast.success(data?.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  },[dToken])



  return (
    profileData && (
      <div className="p-5 w-full dark:bg-[#0E1424] dark:text-white">
        <div className="flex flex-col gap-4 ">
          <div>
            <img
              className="bg-primary/80 w-full rounded-lg sm:max-w-64 "
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white dark:bg-[#0E1424]">
            {/* ------- Doc info :name , degree, experience ---- */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience} Years
              </button>
            </div>

            {/* ----- Doc About ---- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}
                {isEdit ? (
                  <input
                    type="text"
                    className={`${
                      isEdit ? "outline outline-blue-900 rounded px-2" : ""
                    }`}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    className={`${
                      isEdit ? "outline outline-blue-900 rounded px-2 dark:text-black py-1" : ""
                    }`}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    className={`${
                      isEdit ? "outline outline-blue-900 rounded px-2 dark:text-black py-1" : ""
                    }`}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className=" flex gap-1 pt-2">
              <input
                checked={profileData?.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Abailable</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white hover:transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white hover:transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
