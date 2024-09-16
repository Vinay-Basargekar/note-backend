require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url =
	"mongodb+srv://vinaybasargekar13:%40Dahipeda6543@cluster0.4qlrh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0";
console.log("connecting to", url);

mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
});

//modifies the output of the toJSON method
noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Note", noteSchema);
