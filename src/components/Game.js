import React, {useState} from "react";
import Board from  "./Board";
import {calculateWinner} from "../helper";

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXisNext] = useState(true);
	const winner = calculateWinner(history[stepNumber]);
	const xo = xIsNext ? "X" : "O";
	const handleClick = (i) => {
		const historyPoint = history.slice(0, stepNumber + 1);
		const current = historyPoint[stepNumber];
		const squares = [...current];
		if(winner || squares[i]) return;
		squares[i] = xo;
		setHistory([...historyPoint, squares]);
		setStepNumber(historyPoint.length);
		setXisNext(!xIsNext);
	};
	
	const jumpTo = (step) => {
		setStepNumber(step);
		setXisNext(step%2 === 0);
	};
	
	const renderMoves = () =>
		history.map((_step, move) =>{
			const destination = move ? 'New move' : "Go to start";
			return(
				<li key={move}>
					<button onClick ={() => jumpTo(move)}>{destination}</button>
				</li>	
			);
		});
	
	return(
		<>
			<h1>Ali Mozaffari React TicTacToe</h1>
			<Board squares={history[stepNumber]} onClick={handleClick} />
			<div className="info-wrapper">
				<div>
					<h3>History</h3>
					{renderMoves()}
				</div>
				<h3>{winner ? "Winner " + winner : "Next Player : " + xo}</h3>
			</div>
		</>
	);
};
export default Game;