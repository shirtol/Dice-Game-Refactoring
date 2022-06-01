import React, { Component, useEffect, useState } from "react";
import Button from "../Button/Button";
import Dice from "../Dice/Dice";
import { getRandomNumInRange } from "../Game/GameLogic";
import "./GamePanel.css";

const GamePanel = ({
    range,
    onResetGame,
    onEndTurn,
    scoreToWinTitle,
    isGameEnded,
    disableButtons,
    hasRollDice,
    onRollDice,
}) => {
    const [currDice, setCurrDice] = useState([1, 1]);

    const refreshGame = () => {
        onResetGame();
    };

    const rollDice = () => {
        const newDiceVal1 = getRandomNumInRange(range);
        const newDiceVal2 = getRandomNumInRange(range);
        setCurrDice([newDiceVal1, newDiceVal2]);
        onRollDice(newDiceVal1 + newDiceVal2);
    };

    const endTurn = () => {
        onEndTurn();
    };

    return (
        <div className="game-panel">
            <Button
                handleClick={refreshGame}
                buttonText="NEW GAME"
                iconClass="fa-solid fa-rotate fa-2x"
            ></Button>
            <h2 className="score-to-win-title">
                <span>Score To Win:</span>
                <br></br>
                <span>{scoreToWinTitle}</span>
            </h2>
            <div className="dice-container">
                <Dice diceVal={currDice[0]}></Dice>
                <Dice diceVal={currDice[1]}></Dice>
            </div>
            <div className="game-options">
                <Button
                    handleClick={rollDice}
                    buttonText="ROLL DICE"
                    iconClass="fa-solid fa-dice fa-2x"
                    disabled={isGameEnded || disableButtons}
                ></Button>
                <Button
                    handleClick={endTurn}
                    buttonText="END TURN"
                    iconClass="fa-solid fa-check fa-2x"
                    disabled={isGameEnded || !hasRollDice}
                ></Button>
            </div>
        </div>
    );
};

export default GamePanel;
