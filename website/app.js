/* Global Variables */
const apiKey = "7c4e70cfd3f5de0e6d7340767831ff67"
const url = 'https://api.openweathermap.org/data/2.5/weather'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const postData = async (url = '', weatherData = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(weatherData)
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const getData = async (url, zip, apiKey) => {

  const res = await fetch(`${url}?q=${zip}&appid=${apiKey}`)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerText = Math.ceil(allData.temp.main.temp - 273.15) + ' celsius';
    document.getElementById('date').innerText = allData.date;
    document.getElementById('content').innerText = allData.content;
  } catch (error) {
    console.log("error", error);
  }
}

document.getElementById('generate').addEventListener('click', performAction);

//query the dynamic query on clicking the button e.g post,get and update the UI
function performAction() {
  //get html values from
  const zipCode = document.getElementById("zip").value
  const content = document.getElementById("feelings").value
  getData(url, zipCode, apiKey)
    .then(temperature => {
      console.log(temperature);
      postData('/add', { temp: temperature, date: newDate, content: content })
        .then(() => {
          updateUI();
          console.log('Data sent');
        })
    }
    );
}


//server response from
/*
{
  temp: {
    coord: { lon: 29.7605, lat: 62.6008 },
    weather: [ [Object] ],
    base: 'stations',
    main: {
      temp: 290.42,
      feels_like: 290.5,
      temp_min: 290.42,
      temp_max: 290.42,
      pressure: 1008,
      humidity: 88
    },
    visibility: 10000,
    wind: { speed: 4.12, deg: 290 },
    clouds: { all: 50 },
    dt: 1657045582,
    sys: {
      type: 1,
      id: 1338,
      country: 'FI',
      sunrise: 1656980076,
      sunset: 1657050962
    },
    timezone: 10800,
    id: 655808,
    name: 'Joensuu',
    cod: 200
  },
  date: '6.5.2022',
  content: 'ggggggggggggggggggggggggg'
}

*/