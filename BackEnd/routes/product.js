const express = require("express");
const router = express.Router();

const {getProductById, createProdcut, getProduct, photo, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")


//parameters
router.param("userId", getUserById);
router.param("productId", getProductById);


//create routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProdcut);


//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo)


//update routes
router.put("/products/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)


//delete routes
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct)

//listing route
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;