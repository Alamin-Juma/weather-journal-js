
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
  projectData.temp = req.body.temp
  projectData.date = req.body.date
  projectData.content = req.body.content
  console.log(projectData)
  return res.send(projectData)
}


// TODO-GET route for /all
app.get('/all', getAllProjectData )
function getAllProjectData (req, res){
  return res.send(projectData)
}

//creating local server 
const port = 9000;
app.listen(
  port,
  () => console.log(`Server Running On Port ${port}...`)
);