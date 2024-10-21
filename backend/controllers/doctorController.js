import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";



const changeAvailablity = async (req,res,next) => {
  try {
    
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({success:true,message:'Availablity Changed'})


  } catch (error) {
      console.log(error);
      next(error);
  }
}



const doctorList = async (req,res,next) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"])
    
    res.json({ success: true, doctors });
  } catch (error) {
    next(error)
  }
}


// API for doctor login
const loginDoctor = async (req,res,next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).json({success:false,message:"email and password must be required"})
    }
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(400).json({success:true,message:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, doctor?.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECREAT)
      
      res.status(200).json({success:true,token})
    } else {
      res.status(400).json({success:false,message:"Invalid credentials"})
    }

  } catch (error) {
    next(error)
  }
}


// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req,res,next) => {
  try {
    const { docId } = req.body;
    
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });


  } catch (error) {
    res.json({success:false,message:error.message})
  }
}



export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctor };











