const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)

    .then(()=>{
    console.log("DB connected successfully");
    })

    .catch((err) => {
        console.log("DB facing connection Error");
        console.error(err);
        process.exit(1);
    })
}
    module.exports = dbConnect;
