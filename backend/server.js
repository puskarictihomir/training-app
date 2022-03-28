require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = 4001;

const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

app.use("/api", indexRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`));
