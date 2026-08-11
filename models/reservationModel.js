const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        guests: {
            type: String,
            required: true,
        },
        reservationDate: {
            type: Date,
            required: true,
        },
        reservationTime: {
            type: String,
            required: true,
        },
        tableNumber: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Pending",
        },
        specialRequest: {
            type: String,
            default: "",
        },
    });

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;