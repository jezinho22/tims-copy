import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "./Button";

function App() {
	const [games, setGames] = useState([]);
	const [years, setYears] = useState(["1983"]);

	// useEffect allows one-off call of function to set years
	// page is then re-rendered once with year buttons
	useEffect(() => {
		getYears();
	}, []);

	// function to fetch years and set state to render buttons from
	async function getYears() {
		const API = "https://games-explorer.onrender.com/games";
		const res = await axios.get(API);
		const data = res.data;
		let yearArray = data.map((game) => game.year);
		setYears([...new Set(yearArray)]);
	}

	async function getGames(endpoint) {
		const API = `https://games-explorer.onrender.com/${endpoint}`;
		const res = await axios.get(API);
		setGames(res.data);
	}

	//games?year=1995
	return (
		<div className="App">
			<h1>Game Explorer</h1>
			<div className="btn-container">
				{/* add buttons for years in games data */}
				{years.map((year) => (
					<Button
						endpoint={`games?year=${year}`}
						btnText={year}
						getGames={getGames}
					/>
				))}
				{/* and one for the random api endpoint */}
				<Button endpoint="random" btnText="Random" getGames={getGames} />
			</div>
			{games.map((game, idx) => {
				return (
					<p key={idx}>
						{game.name} - {game.year}
					</p>
				);
			})}
		</div>
	);
}

export default App;
