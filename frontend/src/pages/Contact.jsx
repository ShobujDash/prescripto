import React from 'react'
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-primary font-medium">US</span>{" "}
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center sm:flex-row gap-12 text-sm">
        <img
          className="w-full sm:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 ">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">Dhaka Mirpur</p>
          <p className="text-gray-500">Tel:01785455 , shobuj@gamil.com</p>
          <p className="text-gray-600 font-semibold text-lg">
            Careers at PRESCRIPTO
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className='text-gray-500 border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default Contact
