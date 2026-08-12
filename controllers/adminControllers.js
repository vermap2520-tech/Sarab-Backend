const Admin = require("../models/adminModel");

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// -----------------------------------------------------------------------------
const getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// -----------------------------------------------------------------------------

const updateAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const updateData = { fullname, email };
    if (password) {
      updateData.password = password;
    }
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" },
    );
    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedAdmin,
      message: "Admin updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// -----------------------------------------------------------------------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    res.status(200).json({
      success: true,
      message: admin.role === "superadmin"
        ? "SuperAdmin Login Successful"
        : "Admin Login Successful",
      admin: {
        _id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
        image: admin.image,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------------------------------------------------------
const registerAdmin = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide fullname, email and password",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const totalAdmins = await Admin.countDocuments();

    const admin = await Admin.create({
      fullname,
      email,
      password,
      image: req.file ? req.file.filename : "",
      role: totalAdmins === 0 ? "superadmin" : "admin",
    });

    res.status(201).json({
      success: true,
      message: totalAdmins === 0
        ? "SuperAdmin registered successfully"
        : "Admin registered successfully",
      data: {
        _id: admin._id,
        fullname: admin.fullname,
        email: admin.email,
        image: admin.image,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// -----------------------------------------------------------------------------
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    console.log(admin);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -------------------------------------------------------------------------
const isSuperAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Only SuperAdmin can perform this action",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  registerAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  isSuperAdmin
};
