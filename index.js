const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// app.get("/", (request, response) => {
// 	response.send("<h1>Hello World!</h1>");
// });

app.get("/notes", (request, response) => {
	// response.json(notes);
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.post("/notes", (request, response) => {
	const body = request.body;

	if (body.content === undefined) {
		return response.status(400).json({ error: "content missing" });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

app.put("/notes/:id", (request, response) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => {
			response.status(400).send(error);
		});
});


app.get("/notes/:id", (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note);
	});
});

app.delete("/notes/:id", (request, response) => {
	Note.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => {
			response.status(500).send(error);
		});
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
