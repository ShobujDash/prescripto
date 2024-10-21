import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const {  setAToken, backendUrl } = useAdminContext();
  const { dToken, setDToken } = useDoctorContext();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken',data.token)
          setAToken(data.token)
          toast.success("Login Successfully")
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
          if (data.success) {
            localStorage.setItem("DToken", data.token);
            setDToken(data.token);
            console.log(data.token)
            toast.success("Login Successfully");
          } else {
            toast.error("Invalid Credentials");
          }
      }
    } catch (error) {
      toast.error("Something went wrong, please try again"); // Toast for any error in the request
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border dark:border-gray-600 dark:shadow-gray-600 rounded-xl text-[#5E5E5E] dark:text-white text-sm shadow-2xl">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="email"
            placeholder="email@email.com"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="password"
            placeholder="*********"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 my-1 rounded-full">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>{" "}
          </p>
        ) : (
          <p>
            Admin Login{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
