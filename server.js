// const projectData = {};
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, listener);

function listener() {
  console.log("Server Running!");
  console.log(`Running in localhost:${port}`);
}

// Setup empty JS object to act as endpoint for all routes

// Initialize all route with a callback function

// Callback function to complete GET '/all'

app.get("/all", getWeatherData);

function getWeatherData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

// Post Route

app.post("/addWeatherData", addWeatherData);

function addWeatherData(req, res) {
  projectData.zip = req.body.zip;
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.feelings;

  console.log("req.body", req.body);
  console.log("projectData", projectData);

  res.send(projectData);
}

// function addWeatherData(req, res) {
//   newEntry = {
//     date: req.body.date,
//     zip: req.body.zip,
//     temp: req.body.temp,
//     content: req.body.feelings,
//   };

//   projectData.push(newEntry);
//   res.send(projectData);
//   console.log(projectData);
// }
