const express = require("express");

const {
    createContact,
    getAllContacts,
    getSingleContact,
    updateContactStatus,
    deleteContact,
} = require("../controllers/contactControllers");

const router = express.Router();

// Create contact
router.post("/create", createContact);

// Get all contacts
router.get("/all", getAllContacts);

// Get single contact
router.get("/single/:id", getSingleContact);

// Update contact status
router.put("/status/:id", updateContactStatus);

// Delete contact
router.delete("/delete/:id", deleteContact);

module.exports = router;