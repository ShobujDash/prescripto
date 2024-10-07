import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    about: "",
    speciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
  });

  const { backendUrl, aToken } = useAdminContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("experience", input.experience);
      formData.append("fees", Number(input.fees));
      formData.append("about", input.about);
      formData.append("speciality", input.speciality);
      formData.append("degree", input.degree);
      formData.append(
        "address",
        JSON.stringify({ line1: input.address1, line2: input.address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setInput({
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          about: "",
          speciality: "General physician",
          degree: "",
          address1: "",
          address2: "",
        });
        setDocImg(false)
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-[#0F172A] w-full">
      <p className="mb-3 p-2 text-lg font-medium dark:text-white">Add Dcotro</p>

      <div className="px-8 py-8 border rounded w-full max-h-[82vh] overflow-y-scroll">
        <div className="flex gap-3 items-center mb-8 text-gray-500 dark:text-white">
          <label htmlFor="doc-image">
            <img
              className="w-16 bg-gray-500 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-image"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 dark:text-white">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Doctor name</p>
              <input
                onChange={handleChange}
                name="name"
                value={input.name}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={handleChange}
                name="email"
                value={input.email}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={handleChange}
                name="password"
                value={input.password}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={handleChange}
                name="experience"
                value={input.experience}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                id=""
              >
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={handleChange}
                name="fees"
                value={input.fees}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specility</p>
              <select
                onChange={handleChange}
                name="speciality"
                value={input.speciality}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={handleChange}
                name="degree"
                value={input.degree}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={handleChange}
                name="address1"
                value={input.address1}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="text"
                placeholder="Address1"
                required
              />
              <input
                onChange={handleChange}
                name="address2"
                value={input.address2}
                className="border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
                type="text"
                placeholder="Address2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About</p>
          <textarea
            onChange={handleChange}
            name="about"
            value={input.about}
            className="w-full border rounded px-3 py-2 dark:text-black focus:outline-none focus:bg-blue-100"
            type="text"
            placeholder="write about doctor"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary py-3 px-5 rounded-full text-white cursor-pointer mt-2 flex items-center justify-center"
          disabled={loading}
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
            "Add Doctor"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
