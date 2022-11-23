import React, { useState, useEffect } from "react";

function App() {
	const [data, setData] = useState();
	const URL = "http://localhost:3000/books";

	useEffect(() => {
		fetch(URL || "https://goodbooks.onrender.com/books")
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			})
			.catch((err) => console.error(err));
	}, []);

	if (!data) return <div className="loader">Loading...</div>;

	return (
		<table border="1px">
			<thead>
				<tr>
					<th className="p-1">Index</th>
					<th className="p-1">Title</th>
					<th className="p-1">Author</th>
					<th className="p-1">Publisher</th>
					<th className="p-1">Publication Date</th>
					<th className="p-1">Average Rating</th>
				</tr>
			</thead>
			<tbody>
				{data.map(
					({ bookID, title, author, publisher, publicationDate, rating }) => {
						return (
							<tr key={bookID}>
								<td className="text-center">{bookID}</td>
								<td className="p-1">{title}</td>
								<td className="p-1">{author}</td>
								<td className="p-1">{publisher}</td>
								<td className="text-center">{publicationDate}</td>
								<td className="text-center">{rating}</td>
							</tr>
						);
					}
				)}
			</tbody>
		</table>
	);
}

export default App;
