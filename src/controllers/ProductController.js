const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, "name price");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
