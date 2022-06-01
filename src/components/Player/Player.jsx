import React, { Component, useContext } from "react";
import { gameContext } from "../../Context/gameContext";
import "./Player.css";

const Player = ({ name, totalScore, currScore }) => {
    return (
        <div className="player-container">
            <div className="bg-player-container"></div>
            <div className="player">
                <h1 className="player-name">{name}</h1>
                <h1 className="total-score">{totalScore}</h1>
                <div className="curr-score-container">
                    <h1 className="curr-score-title">Current Score</h1>
                    <h2 className="curr-score">{currScore}</h2>
                </div>
            </div>
        </div>
    );
};

export default Player;
