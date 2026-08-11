const Reservation = require("../models/reservationModel");

// Add Reservation
const addReservation = async (req, res) => {
    try {
        const { reservationDate, reservationTime, tableNumber } = req.body;

        // Check if Reservation already exists
        const existingReservation = await Reservation.findOne(
            { reservationDate, reservationTime, tableNumber });

        if (existingReservation) {
            return res.status(400).json({
                success: false,
                message: "This table is already reserved for this date and time.",
            });
        };

        // Create reservation only after checking
        const reservation = new Reservation(req.body);
        await reservation.save();

        res.status(201).json({
            success: true,
            message: "Reservation booked successfully.",
            data: reservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Reservation
const getSingleReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }
        res.status(200).json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Reservation
const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reservation updated successfully.",
            data: reservation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Reservation
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reservation deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addReservation,
    getAllReservations,
    getSingleReservation,
    updateReservation,
    deleteReservation,
};