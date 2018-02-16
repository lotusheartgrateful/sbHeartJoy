import React from "react";

const Stars = (props) => {

	const stars = [];
	for (let i = 0; i < props.numberOfStars; i ++) {
		stars.push(<span key={i} className="starsSpan">*</span>);
	}
	return (
		<div id="starsDiv">
			{stars}
		</div>
	);
}

const Numbers = (props) => {
	const numberClassName = (number) => {
		if (props.usedNumbers.indexOf(number) >= 0) {
			return "used";
		}		
		if (props.selectedNumbers.indexOf(number) >= 0) {
			return "selected";
		}
	};

	const handleClick = (number) => {
		props.selectNumber(number);
	};

	return (
		<div id="numbersDiv">
			{Numbers.list.map((number, i) => 
				<span key={i} 
					  className={numberClassName(number)} 
					  onClick={() => props.selectNumber(number)}>{number}</span>
			)}
		</div>
	);
}

Numbers.list = [1,2,3,4,5,6,7,8,9];

const Button = (props) => {
	let button;
	switch(props.answerIsCorrect) {
		case true:
			button = <button className="btn btn-success" onClick={props.acceptAnswer}>=</button>;
			break;
		case false:
			button = <button className="btn btn-fail">=</button>;
			break;		
		default:
			button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>;
			break;		
	}

	return (
		<div id="buttonDiv">
			{button}
			<br /><br />
			<button className="btn btn-warning btn-sm" onClick={props.redraw}>
				Refresh
			</button>
		</div>
	);
}
const Answer = (props) => {
	return (
		<div id="answersDiv">
			Answers: 
			{props.selectedNumbers.map((number, i) =>
				<span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
			)}
		</div>
	);
}

class Game extends React.Component {
	state = {
		selectedNumbers: [],
		randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
		usedNumbers: [],
		answerIsCorrect: null,
	};

	selectNumber = (clickedNumber) => {
		if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
			return;
		}
		this.setState(prevState => ({
						selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
		}));
	};

	unselectNumber = (clickedNumber) => {
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
		}));
	};

	checkAnswer = () => {
		this.setState(prevState => ({
			answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
		}));
	};

	acceptAnswer = () => {
		this.setState(prevState => ({
			usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
			selectedNumbers: [],
			answerIsCorrect: null,
			randomNumberOfStars: 1 + Math.floor(Math.random()*9),
		}));
	};

	redraw = () => {
		this.setState(prevState => ({
			randomNumberOfStars: 1 + Math.floor(Math.random()*9),
			answerIsCorrect: null,
			selectedNumbers:[],
		}));
	};

	render() {
		const {selectedNumbers, randomNumberOfStars, usedNumbers, answerIsCorrect} = this.state;

		return (
			<div>
				<h2>Play Nine</h2>
				<Stars numberOfStars={randomNumberOfStars} />
				<Button selectedNumbers={selectedNumbers} 
						checkAnswer={this.checkAnswer} 
						acceptAnswer={this.acceptAnswer} 
						answerIsCorrect={answerIsCorrect} 
						redraw={this.redraw} />
				<Answer selectedNumbers={selectedNumbers}  unselectNumber={this.unselectNumber}/>
				<br />
				<Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} selectNumber={this.selectNumber} />
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<div><h1>Simple App</h1></div>
				<Game />
			</div>
		);
	}
}

export default App;