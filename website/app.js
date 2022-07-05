/* Global Variables */
const appid = "b190a0605344cc4f3af08d0dd473dd25"
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

const getData = async (url, zip, appId) => {

  const res = await fetch(`${url}?q=${zip}&appid=${appId}`)
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
    document.getElementById('temp').innerText = Math.ceil(allData.temp.main.temp -273.15) + ' celsius';
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
  const zip = document.getElementById("zip").value
  const content = document.getElementById("feelings").value
  getData(url, zip, appid)
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
