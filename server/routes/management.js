const express = require("express");
const {getAdmin} = require("../controllers/management");
const router = express.Router();

router.get('/admin', getAdmin);

module.exports = router;