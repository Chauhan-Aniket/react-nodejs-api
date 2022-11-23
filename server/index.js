const path = require("path");
const express = require("express");
const fs = require("fs");
const { parse } = require("csv-parse");

const PORT = process.env.PORT || 3001;
const app = express();

const csvData = [];

const csvRead = fs
	.createReadStream("./books.csv")
	.pipe(parse({ delimiter: ",", from_line: "2" }))
	.on("data", (row) => {
		csvData.push({
			bookID: row[0],
			title: row[1],
			author: row[2],
			rating: row[3],
			publisher: row[11],
			publicationDate: row[10],
		});
	});

// Have Node serve the files for our built React app
app.use((req, res, next) => {
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type");
	next();
});

csvRead.on("end", () => {
	// Handle GET requests to /books route
	app.get("/books", (req, res) => {
		res.json(csvData);
	});
});

// add middlewares
app.use(express.static(path.join(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
