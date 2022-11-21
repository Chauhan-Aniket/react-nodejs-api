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

csvRead.on("end", () =>
	app.get("/books", (req, res) => {
		res.json(csvData);
	})
);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
