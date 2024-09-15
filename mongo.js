const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vinaybasargekar13:${password}@cluster0.4qlrh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

// console.log("url", url); // Log the URL to verify its correctness

mongoose.connect(url).catch((err) => {
	console.error("Error connecting to MongoDB:", err.message);
});

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

// const note = new Note({
// 	content: "HTML is easy",
// 	important: true,
// });

// note
// 	.save()
// 	.then((result) => {
// 		console.log("note saved!");
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => {
// 		console.error("Error saving note:", err.message);
// 	});
