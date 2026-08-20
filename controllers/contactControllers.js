const Contact = require("../models/contactModel");

// Create Contact
const createContact = async (req, res) => {
    try {
        console.log(req.body);
        
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, subject and message are required",
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully",
            data: contact,
        });

    } catch (error) {
        console.error("Create Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// Get All Contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });

    } catch (error) {
        console.error("Get Contacts Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// Get Single Contact
const getSingleContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: contact,
        });

    } catch (error) {
        console.error("Get Single Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// Update Contact Status
const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "read", "replied"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact status updated successfully",
            data: contact,
        });

    } catch (error) {
        console.error("Update Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// Delete Contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
        });

    } catch (error) {
        console.error("Delete Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


module.exports = {
    createContact,
    getAllContacts,
    getSingleContact,
    updateContactStatus,
    deleteContact,
};