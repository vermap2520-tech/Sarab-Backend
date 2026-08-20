const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            lowercase: true,
        },

        phone: {
            type: String,
        },

        subject: {
            type: String,
        },

        message: {
            type: String,
        },

        status: {
            type: String,
            enum: ["pending", "read", "replied"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;