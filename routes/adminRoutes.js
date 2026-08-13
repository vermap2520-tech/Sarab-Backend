const express = require("express");
const router = express.Router();

const {
  adminLogin,
  registerAdmin,
  addAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  isSuperAdmin
} = require("../controllers/adminControllers");

router.post("/registerAdmin", isSuperAdmin, registerAdmin);
router.post("/adminLogin", adminLogin);

router.get("/getAllAdmins", getAllAdmin);
router.post("/addAdmin", addAdmin);
router.get("/singleAdmin/:id", getSingleAdmin);
router.post("/updateAdmin/:id", updateAdmin);
router.delete("/deleteAdmin/:id", deleteAdmin);

module.exports = router;
