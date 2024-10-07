import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className=" flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10">
      {/* ----- left side--------- */}
      <div className="md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With TTrusted Doctors
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="self-start"
            src={assets.group_profiles}
            alt="group-profile"
          />
          <p>
            Simple browse though our extensive list of trusted doctors, <br />{" "}
            schedul your appointment hassle-free.{" "}
          </p>
        </div>
        <a
          href="#specility"
          className="w-fit flex items-center gap-2 bg-white px-8 py-4 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* ----- Right side--------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 right-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
