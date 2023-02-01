const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
app.post("/country", async (req, res) => {
  const {lat, lng} = req.body;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    const jsonResponse = response.data;
    const country = jsonResponse.results[0].address_components.find(
        (component) => component.types[0] === "country",
    ).long_name;
    res.send({country});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

app.get("/test", (req, res) => {
  res.send("test");
});

exports.CountryMicroservice = functions.https.onRequest(app);
