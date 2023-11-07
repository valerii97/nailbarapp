const Reservation = require("../model/reservationModel");
const telegabot = require("../model/telega");
// google-calendar api
const googleapi = require("../model/googleapi/googleapi");

const telega = async (req, date) => {
  const { name, email, phone, services, pickedDate } = req.body;
  let telegamsg = `New reservation!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nServices: ${services} \nDate: ${new Date(
    date
  ).toLocaleString()}`;
  telegabot.bot.sendMessage("472359032", telegamsg);
};

exports.index = async (req, res) => {
  const { name, email, phone, services, pickedDate } = req.body;
  // formating user data, which will be displayed in calendar
  const userData = {
    summary: `Appointment for ${name}`,
    description: `Name: ${name}, \nEmail: ${email}, \nPhone: ${phone} \nServices: ${services} \n`,
  };

  try {
    // connecting to google api, making authorization and getting date of reservation made
    const auth = await googleapi.authorize();
    const date = await googleapi.getDatebyId(pickedDate, auth);
    // sending message about new reservation to telegram
    telega(req, date);
    // creating new reservation in google calendar
    const makeReservation = await googleapi.makeReservation(
      pickedDate,
      userData,
      auth
    );
    // creating new reservation in database and saving it there
    const data = new Reservation({
      name: name,
      email: email,
      phone: phone,
      services: services,
      date: date,
    });
    await data.save();
    res.status(200).send({ message: "Reservation succefuly made!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.availableDates = async (req, res) => {
  try {
    // getting list of available dates and times for appointment
    const availableDates = await googleapi
      .authorize()
      .then(googleapi.listEvents)
      .catch(console.error);

    res.send(availableDates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.callMeBack = (req, res) => {
  try {
    const { name, callbackphoneinput } = req.body;
    let telegamsg = `Hello!\nMy name is ${name}\nPls, call me back on number: ${callbackphoneinput}`;
    telegabot.bot.sendMessage("472359032", telegamsg);
    res.status(200).send({ message: "Message succesfully sent!" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.createPrice = async (req, res) => {
  try {
    const { pricetitle, priceprice } = req.body;

    const data = new Price({
      title: pricetitle,
      price: priceprice,
    });
    await data.save();
    res.status(200).send({ message: "request received" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
