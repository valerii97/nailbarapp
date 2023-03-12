const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "model/googleapi/client_secret_324541345237-mvfr95anpl1k3ikv28tsi0jrgjnftmej.apps.googleusercontent.com.json"
);

const CALENDAR_ID =
  "fd5f1b570673dde9f530cd64152db88814c9b7a548aa1a3a8b12622ac83ab1f1@group.calendar.google.com";

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
exports.authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listEvents = async (auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  // console.log(await (await calendar.calendarList.list()).data.items);
  const res = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: new Date().toISOString(),
    // maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
    q: "available",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  const avDates = [];
  events.forEach((item) => {
    avDates.push({ _id: item.id, date: item.start.dateTime });
  });
  return avDates;
};

exports.makeReservation = async (id, userData, auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  const reservDate = await calendar.events.patch({
    calendarId: CALENDAR_ID,
    eventId: id,
    resource: {
      colorId: 11,
      description: userData.description,
      summary: userData.summary,
    },
  });
  return;
};

exports.getDatebyId = async (id, auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  const getEvent = await calendar.events.get({
    calendarId: CALENDAR_ID,
    eventId: id,
  });
  const date = await getEvent.data.start.dateTime;
  return date;
};
//authorize().then(listEvents).catch(console.error);
