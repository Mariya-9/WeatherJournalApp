/* Global Variables */
let zipInput = document.getElementById("zip");
let generateBtn = document.getElementById("generate");
let weatherForm = document.getElementById("weatherForm");
let errorEle = document.getElementById("error");

// Personal API Key for OpenWeatherMap API
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=6501ed9bc62d03244df413e2fdb5ad7e&units=imperial";

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", WeatherAction);

function WeatherAction(e) {
  // Create a new date instance dynamically with JS
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let date = (document.getElementById("date").innerHTML =
    months[d.getMonth()] + " . " + d.getDate() + " . " + d.getFullYear());

  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherTemp(baseURL, zip, apiKey).then(function (data) {
    console.log(data);
    postData("/addWeatherData", {
      zip: zip,
      date: date,
      temp: data.main.temp,
      feelings: feelings,
    }).then(updateWeatherInfo());
  });

  //ERROR MESSAGE
  let messages = [];
  if (zipInput.value === "" || zipInput.value === null) {
    messages.push("Required!");
  } else {
    errorEle.remove();
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorEle.innerText = messages.join(", ");
  }

  // CLEAR THE INPUT VALUES AFTER GENERATE IT
  const input = document.querySelectorAll("input");
  const textarea = document.querySelectorAll("textarea");
  input.forEach((input) => (input.value = ""));
  textarea.forEach((textarea) => (textarea.value = ""));
}

/* Function to GET Web API Data*/

const getWeatherTemp = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log("newData", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateWeatherInfo = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);

    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("zip-code").innerHTML = `Zip Code: ${allData.zip}`;
    document.getElementById("temp").innerHTML = `Temperature: ${Math.round(
      allData.temp
    )} degrees`;

    document.getElementById(
      "content"
    ).innerHTML = `The Day Feelings: ${allData.content}`;

    document
      .getElementById("entryHolder")
      .setAttribute(
        "style",
        " background: rgba(255, 255, 255, 0.9);border-radius: 1rem; margin-left: 0.5rem;width: 100%; padding: 0.5rem; font-size: 1.1rem; margin-top: 1rem;"
      );
  } catch (error) {
    console.log("error", error);
  }
};
