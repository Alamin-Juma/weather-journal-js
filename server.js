
const projectData = {}

// TODO-Express to run server and routes
//express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

/* Initializing the main project folder */
app.use(express.static('website'));



/// setup a basic POST route 

app.post('/add', addProjectData )
function addProjectData (req, res){
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content, 
  }
  weatherData.push(newEntry)
  console.log(weatherData)
  return res.send(weatherData)
}


// TODO-GET route for /all
app.get('/all', getAllProjectData )
function getAllProjectData (req, res){
  //weatherData is [ {{temp}, date, feelings} ]
  return res.send(projectData)
}

//creating local server 
const port = 5000;
app.listen(
  port,
  () => console.log(`Server Running On Port ${port}...`)
);