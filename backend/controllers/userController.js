import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// API to register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validatin email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT);

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// API for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT);
      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

// API to get user profile data
const getProfile = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.status(200).json({ success: true, userData });
  } catch (error) {
    next(error);
  }
};

// API to update user profile
const updateProfile = async (req, res, next) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    const imgeFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imgeFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imgeFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    next(error);
  }
};

// API to book appointment
const bookAppointment = async (req, res, next) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      data: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    next(error);
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });
    if (!appointments) {
      return res.json({
        success: false,
        message: "Cannot find any appointment",
      });
    }
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res, next) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // vefify appointment user
    if (appointmentData.userId !== userId) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized action" });
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

// API to make payment of appointment using rezorpay
class RazorpayInstance {
  constructor(key_id, key_secret) {
    this.key_id = key_id;
    this.key_secret = key_secret;
  }
  initialize() {
    return {
      key_id: this.key_id,
      key_secret: this.key_secret,
    };
  }
}

// Usage example:
const razorpay = new RazorpayInstance(
  process.env.RAZORPAY_KEY_ID,
  process.env.RAZORPAY_KEY_SECRET
);
const razorpayInstance = razorpay.initialize();

const paymentRazorpay = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Appointment Cancelled or not found!",
        });
    }

    // careating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    // const order = await razorpayInstance.orders.create(options)

    res.json({ success: true, order: options });
  } catch (error) {
    next(error);
  }
};

// API to verify payment of rezorpay
const verifyRazorpay = async (req, res, next) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.order.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      res.status(200).json({ success: true, message: "Payment failed" });
    }
  } catch (error) {
    next(error);
  }
};

export {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
  loginUser,
  paymentRazorpay,
  registerUser,
  updateProfile,
  verifyRazorpay,
};
