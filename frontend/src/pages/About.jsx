import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-primary font-medium">US</span>{" "}
        </p>
      </div>

      <div className="flex flex-col justify-center sm:flex-row gap-12 my-10">
        <img
          className="w-full sm:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Prescipto sit amet consectetur adipisicing elit. Quos,
            minus laborum tempora mollitia inventore assumenda sint impedit
            totam dolor sapiente est doloremque consequuntur porro libero?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, minus
            laborum tempora mollitia inventore assumenda sint impedit totam
            dolor sapiente est doloremque consequuntur porro libero?
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, minus
            laborum tempora mollitia inventore assumenda sint impedit totam
            dolor sapiente est doloremque consequuntur porro libero?
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-primary font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col sm:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare perfessionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
}

export default About
