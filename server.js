const fs = require('fs');
const path = require('path');

const notes = require("./data/notes.json");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
	res.json(notes);
});

app.post("/api/notes", (req, res) => {
	// req.body is where our incoming content will be
	console.log(req.body);

	const note = createNewNote(req.body, notes);

	res.json(note);
});

function createNewNote(body, notesArray) {
	const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      );

	return note;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});