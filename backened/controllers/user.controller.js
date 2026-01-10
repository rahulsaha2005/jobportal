import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// --------------------------------------------------------------------------------------------------------------------------------
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: "",
        resumeOriginalName: "",
        profilePhoto: "",
      },
    });

    // Upload profile photo if file exists
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      if (cloudResponse) {
        user.profile.profilePhoto = cloudResponse.secure_url;
        await user.save();
      }
    }

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password is wrong", success: false });
    }

    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "User role is incorrect", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// --------------------------------------------------------------------------------------------------------------------------------
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id; // from auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());
    console.log(req.file);
    if (req.file) {
      const fileUri = getDataUri(req.file);

      try {
        const cloudResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            resource_type: "raw", // important for PDFs, DOCX, etc.
          }
        );
        cloudinary.v2.uploader.upload("sample.pdf", function (error, result) {
          console.log(result, error);
        });
        console.log(cloudResponse);
        if (cloudResponse) {
          // NOTE: If using async: true, the secure_url is generated immediately,
          // but the transformation happens in the background.
          console.log(cloudResponse);
          user.profile.resume = cloudResponse.secure_url.replace(
            "/upload/",
            "/upload/fl_inline/"
          );
          user.profile.resumeOriginalName = req.file.originalname;
        }
      } catch (error) {
        console.error("Cloudinary Error:", error);
      }
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const resume = async (req, res) => {
  try {
    const filename = req.query.file;
    const filepath = path.join(process.cwd(), "files", filename);
    res.sendFile(filepath);
  } catch (error) {
    console.log(error);
  }
};
