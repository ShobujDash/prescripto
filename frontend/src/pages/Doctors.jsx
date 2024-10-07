import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { specility } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (specility) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === specility));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specility]);

  return (
    <div>
      <p className="text-gray-600">Browse though the doctors specilitist.</p>
      <div className=" flex flex-col sm:flex-row items-start gap-5 mt-5 ">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              specility === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "General physician" ? "bg-indigo-100 textblack" : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              specility === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "Gynecologist" ? "bg-indigo-100 textblack" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              specility === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "Dermatologist" ? "bg-indigo-100 textblack" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              specility === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "Pediatricians" ? "bg-indigo-100 textblack" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              specility === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "Neurologist" ? "bg-indigo-100 textblack" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              specility === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 hover:bg-blue-100 ${
              specility === "Gastroenterologist"
                ? "bg-indigo-100 textblack"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full  grid grid-cols-auto gap-4  gap-y-6 max-h-[80vh] overflow-y-scroll">
          {filterDoc.map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50 "
                src={doctor.image}
                alt="doctor image"
              />
              <div className="p-4 ">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
