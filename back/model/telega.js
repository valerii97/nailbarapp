const TeleBot = require("telebot");
const dotenv = require("dotenv");

dotenv.config();

// SETTING UP TELEGRAM
const telegramString = process.env.TELEGRAM_TOKEN;

exports.bot = new TeleBot(telegramString);
