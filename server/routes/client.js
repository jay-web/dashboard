const express = require("express");
const {getProducts} = require("../controllers/client")

const router = express.Router();

router.get('/products/', getProducts)

module.exports = router;