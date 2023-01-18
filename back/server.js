const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bp = require("body-parser");
const dotenv = require("dotenv");

// res router
const reservationRouter = require("./routes/reservationRouter");

//CREATE EXPRESS APP
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// GET .ENV
dotenv.config();

//APPLYING ROUTERS
app.use("/reservations", reservationRouter);

//SETTING UP DATABASE
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database connected!");
});

app.get("/createSchedule", async (req, res) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  const totalDaysInCurrentMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();
  const weekDays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  let avDates = [];
  for (let i = currentDate + 1; i <= totalDaysInCurrentMonth; i++) {
    someDate = new Date(currentYear, currentMonth, i);

    if (
      someDate.getDay() == weekDays.Tuesday ||
      someDate.getDay() == weekDays.Thursday ||
      someDate.getDay() == weekDays.Saturday
    ) {
      avDates.push(new Date(currentYear, currentMonth, i, 10, 30));
      avDates.push(new Date(currentYear, currentMonth, i, 13, 30));
      avDates.push(new Date(currentYear, currentMonth, i, 16, 30));
    }
  }
  avDates.map(async (date) => {
    const data = new DatesModel({
      date: date,
    });
    try {
      const dataToSave = await data.save();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  //   const data = new DatesModel({
  //     date: now,
  //   });
  //   try {
  //     const dataToSave = await data.save();
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
});

// EXPRESS SETTINGS
const PORT = process.env.PORT || 3030;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
