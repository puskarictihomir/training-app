const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`));
