const express = require("express");
const app = express();
const PORT = 8001;
const urlRoutes = require("./routes/url");
const connectDB = require("./connection");

connectDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log('connected to db');
}).catch((e) => console.log('error : ', e));

app.use(express.json())

app.use("/", urlRoutes);

app.listen(PORT, ()=>console.log(`Server started at port: ${PORT}\non http://localhost:${PORT}/ `))