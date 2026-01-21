import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, city, state, country, logo } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name });
    let location = `${city} ${state} ${country}`;

    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name,
      description,
      website,
      location,
      logo,
      userId: req.id,
    });

    return res.status(201).json({
      message: "company regsitered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    //  now want registered company register by that id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company found successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
  }
};

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;
    const file = req.file;
    // cloudinary

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return req.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: " company information update successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};
