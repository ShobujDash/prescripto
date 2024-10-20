import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

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
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



//API  to get all appointments list
const appointmentsAdmin = async (req, res, next) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

// API to canelled appointment
const appointmentCancel = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

   
    // Update appointment status to cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (item) => item !== slotTime
      );
    }

    // Update doctor's available slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Respond success
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    next(error);
  }
};


// API  to get dashboard data for admin panel
const adminDashboard = async (req, res, next) => {
  try {
    
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointment = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointment: appointment.length,
      patients: users.length,
      latestAppointments:appointment.reverse().slice(0,5)
    }

    res.status(200).json({success:true,dashData})

  } catch (error) {
    next(error)
  }
}

export {
  addDoctor,
  allDoctors,
  appointmentsAdmin,
  loginAdmin,
  appointmentCancel,
  adminDashboard,
};
