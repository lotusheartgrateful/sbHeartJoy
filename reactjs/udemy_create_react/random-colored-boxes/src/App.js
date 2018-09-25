import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const NUM_BOXES = 32;

class App extends Component {
  constructor(props) {
    super(props);
    //-- Assign state in the constructor and 32 pieces of state for retaining colors
    //-- Return array of 32 values filled with the random color at the position being mapped.
    const boxes = Array(NUM_BOXES).fill().map(this.getRandomColors, this);
    this.state={boxes}; //-- Object short hand notation for this.state={boxes:boxes }

    //-- Choose a random box from the array and just update the color of that box
    setInterval(() => { //-- Use the arrow function, as this will refer to the enclosing parent
      const boxes = this.state.boxes.slice(); //-- make a copy
      let boxIndex = Math.floor(Math.random() * boxes.length);
      boxes[boxIndex] = this.getRandomColors();
      this.setState({boxes});
    }, 300);
  }

  getRandomColors = () => {
    let colorIndex = Math.floor(Math.random()*this.props.randomColors.length);
    return this.props.randomColors[colorIndex];
  }

  render() {
        const boxes = this.state.boxes.map((color, index) => {
          return <Box color={color} key={index} />
        });
        return (
          <div className="App">
            {boxes}
          </div>
        );
  }
}
App.defaultProps = {
  randomColors:["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
    "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
    "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
    "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
    "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
    "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
    "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
    "Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
    "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
    "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
    "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
    "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
    "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
    "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
    "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
    "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
    "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
    "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
    "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
    "Yellow","YellowGreen"]
};

const Box = ({color}) => { //-- Destructure the props to {color} as we are just accessing the color
  const style = {
    width:"180px",
    height:"180px",
    display:"inline-block",
    backgroundColor:color
  }
  return (
    <div style={style} />
  );
}

export default App;
