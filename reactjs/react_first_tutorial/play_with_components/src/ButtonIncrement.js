import React from "react";

const Result = (props) => {
	return (
		<div>{props.counter}</div>
	);
}

class ButtonIncrement extends React.Component {

	handleClick = () => {
		this.props.onClickFunction(this.props.incrementValue);
	};

	render () {
		return (
			<button onClick={this.handleClick}>
				+{this.props.incrementValue}
			</button>
		);		
	}
}

class App extends React.Component {
	state = {counter: 0};

	incrementCounter = (incrementValue) => {
		this.setState(
			(prevState) => ({counter: prevState.counter + incrementValue})
		);
	}

	render() {
		return (
			<div>
				<ButtonIncrement incrementValue={1} onClickFunction={this.incrementCounter} />
				<ButtonIncrement incrementValue={2} onClickFunction={this.incrementCounter} />
				<ButtonIncrement incrementValue={5} onClickFunction={this.incrementCounter} />
				<Result counter={this.state.counter} />
			</div>
		);
	}
}

export default App;