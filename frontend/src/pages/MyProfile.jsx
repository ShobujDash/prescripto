import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading,setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append("name", userData?.name);
      formData.append("phone", userData?.phone);
      formData.append("address", JSON.stringify(userData?.address));
      formData.append("gender",userData?.gender );
      formData.append("dob", userData?.dob);
      
      image && formData.append('image',image)

      const { data } = await axios.post(backendUrl + "/api/user/update-profile",formData, {
        headers: { token },
      });

      if (data?.success) {
        toast.success(data?.message);
        await loadUserProfileData();
        setIsEdit(false)
        setImage(false)
        setLoading(false)
      } else {
        toast.error(data?.message);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false)
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-0"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 " src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 border border-zinc-300 rounded  p-2 mt-4"
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
            placeholder="name"
          />
        ) : (
          <p className="bg-gray-50 text-3xl font-medium max-w-60 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none " />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="border border-zinc-300 rounded p-2 max-w-52"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
                placeholder="phone"
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p className="">
                <input
                  className="border bg-gray-50 border-zinc-300 rounded  p-2 mt-1"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  placeholder="address line1"
                />
                <br />
                <input
                  className="border bg-gray-50 border-zinc-300 rounded  p-2 mt-1"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  placeholder="address line2"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData?.address?.line1}
                <br />
                {userData?.address?.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3 ">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 border-r-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="font-medium text-gray-400">{userData.gender}</p>
            )}
            <p>Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
              onClick={updateUserProfileData}
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  Processing...
                </>
              ) : (
                "Save Change"
              )}
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
              onClick={() => {
                setIsEdit(true);
                scrollTo(0, 0);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
MyProfile;
