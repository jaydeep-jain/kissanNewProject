const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route.js")
const app = express();

app.use(express.json());


mongoose.set("strictQuery", true);

const URL = "mongodb+srv:/jaydeepjain:05178@cluster0.aawkugv.mongodb.net/Kissan-app";

mongoose.connect(URL, {useNewUrlParser:true})
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Your app is running on PORT "+ (3000||process.env.PORT));
});
