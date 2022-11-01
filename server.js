//Depend
const express = require('express');
const fs = require('fs');
const path = require('path')

//Express set up. 
const app = express();

const PORT = process.env.PORT || 3001;

//Allows me to use the public folder and the assets within it.
app.use(express.static('public'));

//Middleware 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//On page load or ('/') I want it it to default to the index.html fle
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

//WHEN I click on the link to the notes page
//THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//WHEN I enter a new note title and the note’s text
//THEN a Save icon appears in the navigation at the top of the page
//WHEN I click on the Save icon
//THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes



app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
