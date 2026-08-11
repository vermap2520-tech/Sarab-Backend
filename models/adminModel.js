const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },

    fullname: {
      type: String,
      // required: true,
      trim: true,
    },

    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      // required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
