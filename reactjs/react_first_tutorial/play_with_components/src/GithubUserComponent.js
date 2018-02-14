import React from "react";

const Card = (props) => {
	return (
		<div style={{margin: '1em'}}>
			<img width="75" src="{props.profilePic}" />
			<div style={{display: 'inline-block', marginLeft: 10}}>
				<div style={{fontWeight: 'bold'}}>{props.name}</div>
				<div>{props.company}</div>
			</div>
		</div>
	);
};

const CardList = (props) => {
	return (
		<div>
			{props.cards.map(card => <Card key={card.id} {...card} />)}
		</div>
	);
}

class Form extends React.Component {
	state = {userName: ""};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log("prevent default event handler for form submission - ", this.state.userName);
		fetch(`https://api.github.com/users/${this.state.userName}`)
			 .then((resp) => {
				this.props.onSubmit(resp.json());
				this.setState({userName: ''});
			 });
	};

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="text" 
					   placeholder="Enter Github User Name" 
					   value={this.state.userName} 
					   onChange={(event) => this.setState({userName: event.target.value})}
					   required />
				<button type="submit">Add Card</button>
			</form>
		);
	}
}

class App extends React.Component {
	state = {
		cards: [
			]
	};

	addNewCard = (cardInfo) => {
		console.log("new card added", cardInfo);
		this.setState(prevState => ({
			cards: prevState.cards.concat(cardInfo)
		}));
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.addNewCard} />
				<CardList cards={this.state.cards} />
			</div>
		);
	}
}

export default App;