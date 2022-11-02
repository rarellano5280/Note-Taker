//Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path')
const dbFile = require('./db/db.json')

//Express set up. 
const app = express();
//This assigns my port to 3001
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
app.route('/api/notes')
.get((req, res) => {
    res.json(dbFile);
})

.post((req, res) => {
    let jsonPath = path.join(__dirname, '/db/db.json')
    let newestNote = req.body;

 //WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
    let oldestNote = 99;
    for (let i = 0; i < dbFile.length; i++) {
        let individualNote = dbFile[i];

    if(individualNote.id > oldestNote) {
        oldestNote = individualNote.id;
     }
    }
    newestNote.id = oldestNote + 1;
    dbFile.push(newestNote)

    fs.writeFile(jsonPath, JSON.stringify(dbFile), function (err) {
        if(err) {
            return console.log(err);
        } else {
            console.log("Your newest note was saved! ");
        } 
    });
    res.json(newestNote);
});

// Allosw my app to listen at the specified PORT.
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
