const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const init = require("./models/index");
require('dotenv').config();
const container = require("./di");


const userRoute = require("./routes/userRoute");
const applicationRoute = require("./routes/applicationRoute");
const jobRoute = require("./routes/jobRoute");


const app = express();
const port = 8000 || process.env.PORT;


//Initialise DB and Tables
init.initDBAndTables();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use((req,res,next)=>{
    req.container = container.createScope();
    next();
});


app.use("/user", userRoute);
app.use("/application", applicationRoute);
app.use("/job", jobRoute);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

