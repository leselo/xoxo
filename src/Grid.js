//************************************************************************************
//                                  Simple Tic-tac-toe game
//
//                                Playing against the computer
//   by default, the human player starts the game. It can be changed by changing
//   const [humanTurn, setHumanTurn] = useState(true); to ...useState(false);
//
//Created by Laszlo Elo
//************************************************************************************

import React, { useEffect, useState, useRef } from "react";
import "./css/Grid.css";
import X from "./x.png";
import O from "./o.png";

export default function Grid() {
  /* List of Cells */
  const [r1C1, setR1C1] = useState(0);
  const [r1C2, setR1C2] = useState(0);
  const [r1C3, setR1C3] = useState(0);
  const [r2C1, setR2C1] = useState(0);
  const [r2C2, setR2C2] = useState(0);
  const [r2C3, setR2C3] = useState(0);
  const [r3C1, setR3C1] = useState(0);
  const [r3C2, setR3C2] = useState(0);
  const [r3C3, setR3C3] = useState(0);

  /* Players */
  const [machine, setMachine] = useState(11); // Future implementation
  const [human, setHuman] = useState(1); // Future implementation

  // WHo starts ?
  const [humanTurn, setHumanTurn] = useState(true);
  /* hitNext to prevent 3 for player */
  const hitNext = useRef("");
  hitNext.current = "";

  /* Who won the game? */
  const [whoWon, setWhoWon] = useState(" Tie ");

  /*   Chahge the image for user if needed  */
  const [machineImg, setMachineImg] = useState(O); // Future implementation
  const [humanImg, setHumanImg] = useState(X); // Future implementation

  const [isSelf, setIsSelf] = useState(true);
  const retArr = [];
  var newArr = [];
  var twoMachine = [];
  var twoHuman = [];

  const lineA = [r1C1, r1C2, r1C3];
  const lineB = [r2C1, r2C2, r2C3];
  const lineC = [r3C1, r3C2, r3C3];
  const lineD = [r1C1, r2C1, r3C1];
  const lineE = [r1C2, r2C2, r3C2];
  const lineF = [r1C3, r2C3, r3C3];
  const lineG = [r1C1, r2C2, r3C3];
  const lineH = [r1C3, r2C2, r3C1];
  const allLines = [lineA, lineB, lineC, lineD, lineE, lineF, lineG, lineH];

  const goalLine = [
    ["r1c1", "r1c2", "r1c3"],
    ["r2c1", "r2c2", "r2c3"],
    ["r3c1", "r3c2", "r3c3"],
    ["r1c1", "r2c1", "r3c1"],
    ["r1c2", "r2c2", "r3c2"],
    ["r1c3", "r2c3", "r3c3"],
    ["r1c1", "r2c2", "r3c3"],
    ["r1c3", "r2c2", "r3c1"],
  ];

  const StartGame = () => {
    console.log("Start game");
    window.location.reload();
  };

  function GameOver(msg) {
    setTimeout(() => {
      console.log("Game Over: " + msg);
      setWhoWon(msg);
      document.getElementById("gameover").style.visibility = "visible";
    }, 1000);
  }

  //main body of game
  useEffect(() => {
    CountCells().length < 1 && GameOver(" Tie ");
    RenderCells();
    var runLoop = true;

    allLines.filter((line, id) => {
      const sumOfLine = line.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      if (runLoop) {
        if (sumOfLine === 3 * human) {
          console.log("WON");
          GameOver("You WON");
          runLoop = false;
          setHumanTurn(true);
          const threeTogether = goalLine[id].filter((mcell) => mcell);
          threeTogether.map(
            (c) =>
              (document.getElementById(c).style.backgroundColor = "lightgreen")
          );
        } else if (sumOfLine === 2 * human) {
          const oneSingle = goalLine[id].filter((mcell) => GetCellValue(mcell));
          console.log("2human:" + oneSingle);
          twoHuman.push(oneSingle);
        } else if (sumOfLine === human) {
        } else if (sumOfLine === 3 * machine) {
          console.log("Lost");
          GameOver("You lost!");
          runLoop = false;
          const threeTogether = goalLine[id].filter((mcell) => mcell);
          threeTogether.map(
            (c) => (document.getElementById(c).style.backgroundColor = "red")
          );
        } else if (sumOfLine === 2 * machine) {
          const oneSingle = goalLine[id].filter((mcell) => GetCellValue(mcell));
          twoMachine.push(oneSingle);
        } else if (sumOfLine === machine) {
          const oneSingle = goalLine[id].filter((mcell) => GetCellValue(mcell));
          retArr.push(oneSingle);
        }
      }
    });

    if (twoMachine.length) {
      for (let r = 0; r < twoMachine.length; r++)
        newArr = newArr.concat(twoMachine[r]);
    } else if (twoHuman.length === 0) {
      for (let r = 0; r < retArr.length; r++) newArr = newArr.concat(retArr[r]);
    } else {
      for (let r = 0; r < twoHuman.length; r++)
        newArr = newArr.concat(twoHuman[r]);
    }

    console.log(newArr);
    if (newArr.length) {
      const uniqArr = newArr.filter(
        (val, id, array) => array.indexOf(val) === id
      );
      const nextCell = Math.floor(Math.random() * (newArr.length - 1 + 1));
      hitNext.current = uniqArr[nextCell];
      console.log("hitNext::::" + uniqArr[nextCell] + ":" + nextCell);
    }
    if (!humanTurn) {
      MachineIsNext();
    }
  }, [r1C1, r1C2, r1C3, r2C1, r2C2, r2C3, r3C1, r3C2, r3C3]);

  function RenderCells() {
    if (r1C1 === machine)
      document.getElementById("r1c1").innerHTML =
        "<img src=" + machineImg + " />";
    if (r1C1 === human)
      document.getElementById("r1c1").innerHTML =
        "<img src=" + humanImg + " />";

    if (r1C2 === machine)
      document.getElementById("r1c2").innerHTML =
        "<img src=" + machineImg + " />";
    if (r1C2 === human)
      document.getElementById("r1c2").innerHTML =
        "<img src=" + humanImg + " />";

    if (r1C3 === machine)
      document.getElementById("r1c3").innerHTML =
        "<img src=" + machineImg + " />";
    if (r1C3 === human)
      document.getElementById("r1c3").innerHTML =
        "<img src=" + humanImg + " />";

    if (r2C1 === machine)
      document.getElementById("r2c1").innerHTML =
        "<img src=" + machineImg + " />";
    if (r2C1 === human)
      document.getElementById("r2c1").innerHTML =
        "<img src=" + humanImg + " />";

    if (r2C2 === machine)
      document.getElementById("r2c2").innerHTML =
        "<img src=" + machineImg + " />";
    if (r2C2 === human)
      document.getElementById("r2c2").innerHTML =
        "<img src=" + humanImg + " />";

    if (r2C3 === machine)
      document.getElementById("r2c3").innerHTML =
        "<img src=" + machineImg + " />";
    if (r2C3 === human)
      document.getElementById("r2c3").innerHTML =
        "<img src=" + humanImg + " />";

    if (r3C1 === machine)
      document.getElementById("r3c1").innerHTML =
        "<img src=" + machineImg + " />";
    if (r3C1 === human)
      document.getElementById("r3c1").innerHTML =
        "<img src=" + humanImg + " />";
    if (r3C2 === machine)
      document.getElementById("r3c2").innerHTML =
        "<img src=" + machineImg + " />";
    if (r3C2 === human)
      document.getElementById("r3c2").innerHTML =
        "<img src=" + humanImg + " />";
    if (r3C3 === machine)
      document.getElementById("r3c3").innerHTML =
        "<img src=" + machineImg + " />";
    if (r3C3 === human)
      document.getElementById("r3c3").innerHTML =
        "<img src=" + humanImg + " />";
  }

  function CountCells() {
    const emptyCells = [];
    for (let nextRow = 1; nextRow < 4; nextRow++) {
      for (let nextCol = 1; nextCol < 4; nextCol++)
        GetCellValue("r" + nextRow + "c" + nextCol)
          ? emptyCells.push("r" + nextRow + "c" + nextCol)
          : (document.getElementById(
              "r" + nextRow + "c" + nextCol
            ).style.cursor = "auto");
    }
    return emptyCells;
  }

  function MachineIsNext() {
    console.log("MachineIsNext:" + hitNext.current);

    const emptyCells = CountCells();
    if (emptyCells.length > 0) {
      const nextCell = Math.floor(Math.random() * (emptyCells.length - 1 + 1));
      setTimeout(() => {
        if (hitNext.current !== "") {
          SetCellValue(hitNext.current, machine);
          console.log("hitNext:>>>" + hitNext.current);
        } else {
          SetCellValue(emptyCells[nextCell], machine);
          console.log("nextCell:>>>" + emptyCells[nextCell]);
        }

        setHumanTurn(true);
      }, 1000);
    } else GameOver(false);
  }

  function GetCellValue(id) {
    var returnValue = false;
    if (id === "r1c1") {
      r1C1 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r1c2") {
      r1C2 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r1c3") {
      r1C3 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r2c1") {
      r2C1 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r2c2") {
      r2C2 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r2c3") {
      r2C3 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r3c1") {
      r3C1 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r3c2") {
      r3C2 === 0 ? (returnValue = true) : (returnValue = false);
    }
    if (id === "r3c3") {
      r3C3 === 0 ? (returnValue = true) : (returnValue = false);
    }
    return returnValue;
  }

  function SetCellValue(id, val) {
    console.log("SetCellValue(" + id + ", " + val + ")");
    if (id === "r1c1" && r1C1 === 0) {
      setR1C1(val);
    }
    if (id === "r1c2" && r1C2 === 0) {
      setR1C2(val);
    }
    if (id === "r1c3" && r1C3 === 0) {
      setR1C3(val);
    }
    if (id === "r2c1" && r2C1 === 0) {
      setR2C1(val);
    }
    if (id === "r2c2" && r2C2 === 0) {
      setR2C2(val);
    }
    if (id === "r2c3" && r2C3 === 0) {
      setR2C3(val);
    }
    if (id === "r3c1" && r3C1 === 0) {
      setR3C1(val);
      console.log("Setting to:" + val);
    }
    if (id === "r3c2" && r3C2 === 0) {
      setR3C2(val);
    }
    if (id === "r3c3" && r3C3 === 0) {
      setR3C3(val);
    }
  }

  function OnCLickItem(e) {
    if (humanTurn) {
      console.log("OnCLickItem");
      setHumanTurn(false);
      SetCellValue(e, human);
      setIsSelf(!isSelf);
    }
  }

  return (
    <>
      <div id="gameover">
        <div>
          <p>{whoWon}</p>
          GAME OVER
          <p>
            <input
              type="button"
              style={{ cursor: "pointer" }}
              value="Restart Game"
              onClick={StartGame}
            ></input>
          </p>
        </div>
      </div>
      <p>Next up: {humanTurn ? "Your turn" : "machine"}</p>
      <span id="gameon">
        <div className="grid-container">
          <div
            id="r1c1"
            onClick={() => OnCLickItem("r1c1")}
            className="grid-item"
          ></div>
          <div
            id="r1c2"
            onClick={() => OnCLickItem("r1c2")}
            className="grid-item"
          ></div>
          <div
            id="r1c3"
            onClick={() => OnCLickItem("r1c3")}
            className="grid-item"
          ></div>
          <div
            id="r2c1"
            onClick={() => OnCLickItem("r2c1")}
            className="grid-item"
          ></div>
          <div
            id="r2c2"
            onClick={() => OnCLickItem("r2c2")}
            className="grid-item"
          ></div>
          <div
            id="r2c3"
            onClick={() => OnCLickItem("r2c3")}
            className="grid-item"
          ></div>
          <div
            id="r3c1"
            onClick={() => OnCLickItem("r3c1")}
            className="grid-item"
          ></div>
          <div
            id="r3c2"
            onClick={() => OnCLickItem("r3c2")}
            className="grid-item"
          ></div>
          <div
            id="r3c3"
            onClick={() => OnCLickItem("r3c3")}
            className="grid-item"
          ></div>
        </div>
      </span>
    </>
  );
}
