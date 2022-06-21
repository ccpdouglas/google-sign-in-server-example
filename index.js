require("dotenv")();

const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.post("/oauth2callback", async (req, res) => {
    console.log(req.body);

    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(req.body.code);
    oauth2Client.setCredentials(tokens);
    console.log(tokens);
    res.status(200).json(tokens);
});

app.listen(3001);
