const express = require("express");

const router = express.Router();

const {
    addReservation,
    getAllReservations,
    getSingleReservation,
    updateReservation,
    deleteReservation,
} = require("../controllers/reservationController");


// Add Reservation
router.post("/add", addReservation);

// Get All Reservations
router.get("/all", getAllReservations);

// Get Single Reservation
router.get("/single/:id", getSingleReservation);

// Update Reservation
router.post("/update/:id", updateReservation);

// Delete Reservation
router.delete("/delete/:id", deleteReservation);

module.exports = router;