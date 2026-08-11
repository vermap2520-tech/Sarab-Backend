const express = require("express");

const router = express.Router();
const {
    userLogin,
    userRegister,
    singleUser,
    getAllUser,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");

router.post("/userRegister", userRegister);
router.post("/userlogin", userLogin);
router.get("/getAllUser", getAllUser);
router.get("/singleUser/:id", singleUser);
router.post("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;