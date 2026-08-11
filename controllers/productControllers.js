const express = require("express");
const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { title, image, description, category, price, stock, discount } = req.body;
    console.log(req.body);

    const createPr = new Product({
      title: title,
      description: description,
      category: category,
      price: price,
      stock: stock,
      discount: discount || 0,
      image: req.file ? req.file.filename : "",
    });

    const saveProduct = await createPr.save();

    res.status(201).json({
      data: saveProduct,
      success: true,
      message: "success create a product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ------------------------------------------------------------------------------
const delProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    console.log(deleteProduct);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      data: deleteProduct,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -----------------------------------------------------------------------------
const getAllProduct = async (req, res) => {
  try {
    const getproducts = await Product.find({});
    res.json({
      data: getproducts,
      success: true,
      message: "fetch all products",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ------------------------------------------------------------------------------
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      data: updateProduct,
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -----------------------------------------------------------------------------

const getSingleProduct = async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      data: product,
      success: true,
      message: "fetch single product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -----------------------------------------------------------------------------
const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    }

    res.json({
      data: products,
      success: true,
      message: "Products fetched by category",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -----------------------------------------------------------------------------

module.exports = {
  createProduct,
  delProduct,
  getAllProduct,
  updateProduct,
  getSingleProduct,
  getProductByCategory,
};
