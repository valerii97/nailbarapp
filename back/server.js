const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bp = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// ROUTERS
const router = require("./routes/router");
const adminRouter = require("./routes/adminRouter");

// CREATE EXPRESS APP
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// GET .ENV
dotenv.config();

// APPLYING ROUTERS
app.use("/reservations", router);
app.use("/admin", adminRouter);

// SETTING UP DATABASE
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database connected!");
});

// Redirection to build in react
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../front/build");
app.use(express.static(buildPath));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// EXPRESS SETTINGS
const PORT = process.env.PORT || 3030;

// STARTING SERVER
app.listen(PORT, console.log(`Server started on port ${PORT}`));
