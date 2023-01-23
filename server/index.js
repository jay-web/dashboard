const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const salesRoutes = require("./routes/sales.js");
const managementRoutes = require("./routes/management.js");

// ? CONFIGURATION //
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());


// ? ROUTES //
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("sales", salesRoutes);
app.use("management", managementRoutes);


// ? MONGOOSE SETUP //

const PORT = process.env.PORT || 8001;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Database Server running at ${PORT}`))
}).catch(() => {
    console.log("Error connecting server")
})