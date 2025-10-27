import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const register = async (req, res) => {
  try {
    // taking name from front page
    // then checking if something is missing or not
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    // now we know email is unique for every user
    // so finding any user exist with same email
    // if yes return user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exist",
        success: false,
      });
    }
    // now hashing password with bcrypt js of length 10
    const hashedPassword = await bcrypt.hash(password, 10);
    // user make account with given details
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    // account created successfully in database
    return res.status(201).json({
      message: "Account Created SuccessFully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const login = async (req, res) => {
  try {
    // then take email,password and role from login page
    // now checking if it empty or not
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    // taking out data from database for checking if it exists or not
    let user = await User.findOne({ email });
    // checking user exist or not
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // matching password using bycrpt js
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // sending message error for wrng password
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password is Wrong",
        success: false,
      });
    }
    //  checking user exist have same role with it login
    if (role !== user.role) {
      return res.status(400).json({
        message: "User role is incorrect",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // storing data in user and sending to frontended

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure:false,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const logout = async (req, res) => {
  // logout code
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const updateProfile = async (req, res) => {
  try {
    // update profile data with existing data
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    //  ? not known till what is it
    const file = req.file;

    // split skills in array format
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // middle ware authencation
    const userId = req.id;

    // finding user by id in database
    let user = await User.findById(userId);

    // checking user exist or not
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // saving it
    await user.save();

    // passing that data to frontend
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
