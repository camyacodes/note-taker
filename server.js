const fs = require("fs");
const path = require("path");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
	const notes = readNotes();
	res.json(notes);
});

app.post("/api/notes", (req, res) => {
	const notes = readNotes();
	req.body.id = notes.length.toString();
	// req.body is where our incoming content will be
	console.log(req.body);

	console.log(notes);
	const note = createNewNote(req.body, notes);

	res.json(note);
});

function createNewNote(body, notesArray) {
	const note = body;
	notesArray.push(note);

	fs.writeFileSync(
		path.join(__dirname, "./data/notes.json"),
		JSON.stringify(notesArray, null, 2)
	);

	return note;
}

function readNotes() {
	const notes = JSON.parse(
		fs.readFileSync(path.join(__dirname, "./data/notes.json"))
	);
	return notes;
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
