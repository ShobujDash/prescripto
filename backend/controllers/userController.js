import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
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
    console.log(userId);
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

export { getProfile, loginUser, registerUser, updateProfile };
