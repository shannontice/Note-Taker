const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001

const api_routes = require('./routes/api_routes.js');

// Stop blocking from middleware
app.use(express.json());

// Create a get route for every file in the public folder
app.use(express.static('./public'))

// Add HTML Routes
app.get('/notes', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/index.html'))
})


// Load API Routes
app.use('/api', api_routes);

app.listen(PORT, () => {
    console.log('Server started on port', PORT)
});