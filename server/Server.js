const express = require("express");
const app = express();
const db = require("./config/db");
const router = require("./router/user");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

db();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is up and running");
});
