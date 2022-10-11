const Product = require("../models/product")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");
const { parse } = require("path");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error : "Could not find the product in DB"
            })
        };
        req.product = product;
        next();
    });
};


exports.createProdcut = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true; 
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error : "problem with image"
            });  
        }
        //destructure the fields
        const {name, description, price, category, stock} = fields;

        if (
            !name || 
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error : "Please include all fields"
            })
        };

        let product = new Product(fields)

        //handle file here]
        if (file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err,product) => {
            if (err){
                return res.status(400).json({
                    error : "Saving tshirt in DB failed"
                });
            };
            res.json(product);
        })
    })
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
}


//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.removeProduct = (req, res) => {
    const product = req.product
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error : "Cannot delete the product"
            })
        }
        res.json({
            deletedProduct, message : "Product successfully deleted"
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true; 
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error : "problem with image"
            });  
        }

        // updation code
        let product = req.product;
        product = _.extend(product, fields)


        //handle file here]
        if (file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.filepath);
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err,product) => {
            if (err){
                return res.status(400).json({
                    error : "Updation of product failed"
                });
            };
            res.json(product);
        })
    })
};


//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 12;
    let sortBy = req.query.SortBy ? req.query.SortBy : "name";

    Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if (err){
            return res.status(400).json({
                error : "No product found"
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req, res) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            UpdateOne : {
                filter : {_id : prod._id},
                update : {$inc : {stock : -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error : "Bulk operation failed"
            })
        }
        next();
    })
}


exports.getAllUniqueCategories = (req, res, next) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error : "unique cateogries not found"
            })
        }
        res.json(category)
    });
};