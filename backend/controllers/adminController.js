import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";

// API for adding doctor
const addDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validate email address
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedePassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // checkEmail
    const isEmailAdded = await doctorModel.findOne({ email });
    if (isEmailAdded) {
      return res.json({
        success: false,
        message: "This Email Already Exist",
      });
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedePassword,
      speciality,
      degree,
      experience,
      fees,
      about,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added." });
  } catch (error) {
    next(error);
  }
};

// API For admin login
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECREAT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Creadentials" });
    }
  } catch (error) {
    next(error);
  }
};



// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    
    const doctors = await doctorModel.find({}).select('-password');
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error)
    next(error)
  }
}



export { addDoctor, loginAdmin, allDoctors };
