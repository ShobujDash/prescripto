import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async (req, res, next) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const doctorList = async (req, res, next) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

// API for doctor login
const loginDoctor = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "email and password must be required",
        });
    }
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res
        .status(400)
        .json({ success: true, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor?.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECREAT);

      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res, next) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res, next) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment Completed" });
    } else {
      return res.status(400).json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    next(error);
  }
};

// API to mark appointment canceled for doctor panel
const appointmentCancel = async (req, res, next) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    next(error);
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res, next) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    next(error);
  }
};


// API to get doctor profile for doctor panel
const doctorProfile = async (req,res,next) => {
  try {
    const { docId } = req.body;
    console.log(docId)
    const profileData = await doctorModel.findById(docId ).select('-password');
    console.log(profileData)
    res.status(200).json({
      success: true,
      profileData
    })
  } catch (error) {
    next(error)
  }
}

// API  to update profile data form doctor panel
const updateDoctorProfile = async (req,res,next) => {
  try {
    const { docId, fees, address, available } = req.body;

      await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    
    res.status(200).json({success:true,message:'Profile Updated'})
  } catch (error) {
    next(error)
  }
}

export {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  changeAvailablity,
  doctorDashboard,
  doctorList,
  loginDoctor,
  doctorProfile,
  updateDoctorProfile
};
