import React from 'react';
import "./App.css"

class ConnectFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedColumn: 3,
      turn: "red"
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleArrowKeys = this.handleArrowKeys.bind(this);
    this.updateSelectPos = this.updateSelectPos.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    // console.log(e.key);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      this.handleArrowKeys(e);
    }
    else if (e.key === "Enter") {
      this.handleEnter(e);
    } 
  }

  handleEnter(e) {
    let selectedColumn = this.state.currentSelectedColumn;
    let firstEmptySpace;
    let currentRow;
    for (let i = 0; i < 6; i++) {
      let position = document.getElementById(`pos${selectedColumn}${i}`);
      if (!position.children[1].classList.contains("position-filled-red") && !position.children[1].classList.contains("position-filled-yellow") && firstEmptySpace === undefined) {
        firstEmptySpace = position;
        currentRow = i;
      }
    }
    if (firstEmptySpace !== undefined) {
      if (this.state.turn === "red") {
        firstEmptySpace.children[1].classList.add("position-filled-red");
        this.checkForWin(selectedColumn, currentRow, "red");
        this.setState({
          turn: "yellow"
        });
      }
      else {
        firstEmptySpace.children[1].classList.add("position-filled-yellow");
        this.checkForWin(selectedColumn, currentRow, "yellow");
        this.setState({
          turn: "red"
        });
      }
    }
  }

  handleArrowKeys(e) {
    if (e.key === "ArrowRight") {
      this.setState((prevState) => ({
        currentSelectedColumn: prevState.currentSelectedColumn + 1
      }));
      if (this.state.currentSelectedColumn === 6) {
        this.setState({
          currentSelectedColumn: 0
        });
      }
      setTimeout(() => this.updateSelectPos(), 50);
    }
    else if (e.key === "ArrowLeft") {
      this.setState((prevState) => ({
        currentSelectedColumn: prevState.currentSelectedColumn - 1
      }));
      if (this.state.currentSelectedColumn === 0) {
        this.setState({
          currentSelectedColumn: 6
        });
      }
      setTimeout(() => this.updateSelectPos(), 50);
    }
  }

  updateSelectPos() {
    let allElems = document.querySelectorAll(".active-select-position");
    for (let i = 0; i < allElems.length; i++) {
      allElems[i].classList.remove("active-select-position");
    }

    let current = `selectPos${this.state.currentSelectedColumn}`
    document.getElementById(current).classList.add("active-select-position");
  }

  checkForWin(col, row, colour) {
    // console.log(col, row, colour);
    // for (let i = 0; i < 7; i++) {
    //   console.log(document.getElementById(`pos${i}${row}`));
    //   document.getElementById(`pos${i}${row}`).children[1].classList.add("winning-pos");
    // }
    let filledClass = `position-filled-${colour}`;
    console.log(filledClass);
    // let connectedFour = false;
    for (let i = 0; i < 4; i++) {
      let j = i;
      let continuous = true;
      while (continuous && j < i + 4) {
        if (!document.getElementById(`pos${j}${row}`).children[1].classList.contains(filledClass)) {
          continuous = false;
        }
        else {
          j++;
        }
      }
      if (j === i + 4) {
        console.log("Connected 4");
        // connectedFour = true;
      }
    }

  }

  render() {

    let grid = [];
    for (let i = 0; i < 7; i++) {
      let col = [];
      for (let j = 0; j < 6; j++) {
        col.push(<ConnectFourPosition id={`pos${i}${5 - j}`}/>)
      }
      grid.push(<div id={`col${i}`} className="column">{col}</div>)
    }

    return(
      <div id="top-level-div">
        <div id="selector-div">
          <div className="selector-position" id="selectPos0">V</div>
          <div className="selector-position" id="selectPos1">V</div>
          <div className="selector-position" id="selectPos2">V</div>
          <div className="selector-position active-select-position" id="selectPos3">V</div>
          <div className="selector-position" id="selectPos4">V</div>
          <div className="selector-position" id="selectPos5">V</div>
          <div className="selector-position" id="selectPos6">V</div>
        </div>
        <div id="grid-div">
          {grid}
        </div>
      </div>
    );
  }
}

function ConnectFourPosition(props) {
  return (
    <div className="position" id={props.id}>
        <div className="square"></div>
        <div className="circle"></div>
    </div>
  )
}

export default ConnectFour;
