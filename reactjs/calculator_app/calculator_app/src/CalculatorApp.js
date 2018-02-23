import React from "react";

const NumberBox = (props) => {
	const handleClickEvent = (event) => {
		event.preventDefault();
		props.handleClick(props.number);
	};

	return (
		<div className="box numberBox" onClick={handleClickEvent}>
			<span>{props.number}</span>
		</div>
	);
}


const NumbersArea = (props) => {

	const handleNumberClick = (aNumber) => {
		console.log("number clicked: " + aNumber);
		props.handleNumberClick(aNumber);
	};

	return (
		<div id="numbersArea">
			
				{
					props.numbers.map(
						(numberVal, index)  => 
							<NumberBox key={index} number={numberVal} handleClick={handleNumberClick} />
					)
				}
			
		</div>
	);
}

const OperationBox = (props) => { 
	let operationDisplay;
	switch(props.operation) {
		case 'A':
			operationDisplay = "+";
			break;
		case 'S':
			operationDisplay = "-";
			break;
		case 'D':
			operationDisplay = "/";
			break;
		case 'M':
			operationDisplay = "*";
			break;
		case 'E':
			operationDisplay = "=";
			break;			
		case 'C':
			operationDisplay = "C";
			break;			
		default:
			break;
	}

	const handleClickEvent = (event) => {
		event.preventDefault();
		props.handleClickEvent(props.operation)
	}
	return (
		<div className="box operationBox" onClick={handleClickEvent}>
			<span>{operationDisplay}</span>
		</div>
	);
}

const OperationsArea = (props) => {

	const handleClick = (aValue) => {
		props.handleOperationClick(aValue);
	}

	return (
		<div id="operationsArea">
		{
			props.operations.map( 
				(operationVal, index) => 
					<OperationBox operation={operationVal} key={index} handleClickEvent={handleClick}/>
			)
		}
		</div>
	);
}

class App extends React.Component {
	/*constructor(props) {
		super(props);
		this.state = {
			numbers: [0,1,2,3,4,5,6,7,8,9],
			operations: ['C','A','S','D','M'],
			selectedOperationString: null
		};
		this.numberClick = this.numberClick.bind(this);	
	}*/

	state = {
			numbers: [0,1,2,3,4,5,6,7,8,9],
			operations: ['A','S','D','M','E','C'],
			current_text_value: 0,
			current_operation: '',
			first_number: '',
			second_number: ''
		};

	numberClick = (aValue) => {
		console.log("App class - numberClick - " + aValue);
		this.setState(prevState => (
					{
						current_text_value: prevState.current_text_value += aValue
					}
				));	
		if (this.state.first_number.length === 0) {
			this.setState(prevState => ({first_number: prevState.current_text_value}));
		}
		else if (this.state.current_operation.length > 0) {
			this.setState(prevState => ({second_number: prevState.current_text_value}));

		}
	};

	operationClick = (aValue) => {
		console.log("App class - operationClick - " + aValue);
		let operator = null;
		let result = 0;
		let operatorSet = true;
		let doOperation = false;
		switch(aValue) {
			case 'A':
				operator = "+";
				break;
			case 'S':
				operator = "-";
				break;
			case 'D':
				operator = "/";
				break;
			case 'M':
				operator = "*";
				break;
			case 'C':
				operator = "C";
				operatorSet = false;
				this.setState(prevState => (
					{ 
						current_text_value: '',
						first_number: 0,
						second_number: 0,
						current_operation: ''
					}
				));
				console.log("App class - operationClick - all cleared");
				break;	
			case 'E':
				operator = "=";
				operatorSet = false;
				doOperation = true;
				break;						
			default:
				break;
		}

		if (operatorSet) {
			this.setState(prevState => ({current_operation: operator}));
			console.log("App class - operationClick - operator is set to " + operator);
		}
		else if (doOperation) {
			console.log("App class - operationClick - perform operation");
			let firstNumber = this.state.first_number;
			let secondNumber = this.state.second_number;
			console.log("App class - operationClick - perform operation - firstNumber = " + firstNumber + ", second number = " + secondNumber + ", operator used = " + this.state.operation);
			switch(this.state.current_operation) {
				case '+':
					result = firstNumber + secondNumber;
					break;
				case '-':
					result = firstNumber - secondNumber;
					break;
				case '/':
					result = firstNumber / secondNumber;
					break;
				case '*':
					result = firstNumber * secondNumber;
					break;		
				default:
					break;				
			}
			console.log("App class - operationClick - performed operation - result = " + result + ", all other states are cleared.");
			this.setState(prevState => (
				{
					current_text_value: result,
					first_number: 0,
					second_number: 0,
					current_operation: ''
				}
			));			
		}
	}

	onChangeTextValue = (event) => {
		event.preventDefault();
		this.setState(prevState => (
					{
						current_text_value: event.target.value
					}
				));
	}
	render() {
		//const {numberClick} = this.state;
		return (
			<div>
				<div id="inputArea">
					<input type="text" name="displayBox" id="displayBox" value={this.state.current_text_value}/>
				</div>
				<NumbersArea  numbers={this.state.numbers} handleNumberClick={this.numberClick}/>
				<OperationsArea operations={this.state.operations} handleOperationClick={this.operationClick} />
			</div>
		);
	}
}

export default App;