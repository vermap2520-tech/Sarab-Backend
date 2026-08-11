const express = require("express");
const router = express.Router();

const {
  createProduct,
  delProduct,
  getAllProduct,
  updateProduct,
  getSingleProduct, getProductByCategory
} = require("../controllers/productControllers");

router.post("/add", createProduct);
router.get("/all", getAllProduct);
router.delete("/deleteProduct/:id", delProduct);
router.post("/updateProduct/:id", updateProduct);
router.get("/singleProduct/:id", getSingleProduct);
router.get("/category/:category", getProductByCategory);

module.exports = router;
