import React, { useContext, useEffect } from "react";
import { MediaPlayer } from "../../Music/Sounds";
import EndGamePopUp from "../EndGamePopUp/EndGamePopUp";
import GamePanel from "../GamePanel/GamePanel";
import Player from "../Player/Player";
import StartGamePopUp from "../StartGamePopUp/StartGamePopUp";
import { getRandomNumInRange } from "../Game/GameLogic";
import "./Game.css";
import HowToPlayPopUp from "../HowToPlayPopUp/HowToPlayPopUp";
import { gameContext } from "../../Context/gameContext";

const Game = () => {
    const {
        totalScores,
        setTotalScores,
        activePlayer,
        setActivePlayer,
        currScore,
        setCurrScore,
        scoreToWin,
        setScoreToWin,
        isEndGame,
        setIsEndGame,
        winningPlayer,
        setWinningPlayer,
        hasRollDice,
        setHasRollDice,
        numOfDice,
        setNumOfDice,
        isStartGame,
        setIsStartGame,
        playerOneName,
        setPlayerOneName,
        playerTwoName,
        setPlayerTwoName,
        musicPlaying,
        setMusicPlaying,
        isInstructionsClicked,
        setIsInstructionsClicked,
    } = useContext(gameContext);

    const mediaPlayer = new MediaPlayer(() => setMusicPlaying(false));

    const gotDoubleSix = (sumOfDice) => sumOfDice === numOfDice * 6;

    const updatePlayerScore = (sumOfDice) => {
        setCurrScore((prevCurrScore) => prevCurrScore + sumOfDice);
        setHasRollDice(true);
    };

    const resetPlayerScore = () => {
        setCurrScore(0);
        onEndTurn(0);
    };

    const onRollDice = (sumOfDice) => {
        if (!gotDoubleSix(sumOfDice)) {
            updatePlayerScore(sumOfDice);

            mediaPlayer.playSound("roll");
        } else {
            setMusicPlaying(true);
            resetPlayerScore();
        }
    };

    useEffect(() => {
        if (musicPlaying) {
            const randomNumFromFailSounds = getRandomNumInRange([1, 2]);
            mediaPlayer.playSound(`fail${randomNumFromFailSounds}`);
        }
    }, [musicPlaying]);

    const onEndTurn = (scoreToAdd = currScore) => {
        const newScoresArr = [...totalScores];
        newScoresArr[activePlayer] += scoreToAdd;
        setTotalScores(newScoresArr);
        setActivePlayer((prevActivePlayer) => (prevActivePlayer + 1) % 2);
        setCurrScore(0);
        setHasRollDice(false);
    };

    const onInputChange = (scoreEntered) => {
        const limit = 4;
        setScoreToWin(parseInt(scoreEntered.slice(0, limit)));
    };

    const onResetGame = () => {
        setTotalScores([0, 0]);
        setActivePlayer(0);
        setCurrScore(0);
        setIsEndGame(false);
        setWinningPlayer(null);
        setHasRollDice(false);
        setNumOfDice(2);
        setIsStartGame(true);
        setMusicPlaying(false);
    };

    const hasScoreToWin = () => totalScores.indexOf(scoreToWin);

    const hasMoreThanScoreToWin = () =>
        totalScores[activePlayer] + currScore > scoreToWin ? activePlayer : -1;

    const foundWinner = (idxOfWinner) => !isEndGame && idxOfWinner !== -1;

    const updateStateAfterWin = (idxOfWinner) => {
        const winnerName = idxOfWinner === 0 ? playerOneName : playerTwoName;
        setIsEndGame(true);
        setWinningPlayer(winnerName);
    };

    const foundLoser = (idxOfLoser) => !isEndGame && idxOfLoser !== -1;

    const updateStateAfterLoss = (idxOfLoser) => {
        const winnerName = idxOfLoser === 0 ? playerTwoName : playerOneName;
        setIsEndGame(true);
        setWinningPlayer(winnerName);
    };

    useEffect(() => {
        const idxOfWinner = hasScoreToWin();
        const idxOfLoser = hasMoreThanScoreToWin();
        if (foundWinner(idxOfWinner)) {
            updateStateAfterWin(idxOfWinner);
        } else if (foundLoser(idxOfLoser)) {
            updateStateAfterLoss(idxOfLoser);
        }
    });

    const onPlayer1NameEntered = (nameEntered) => setPlayerOneName(nameEntered);

    const onPlayer2NameEntered = (nameEntered) => setPlayerTwoName(nameEntered);

    const startGame = () => setIsStartGame(false);

    const changeInstructionsState = () => {
        setIsInstructionsClicked(
            (prevOsInstructionsClicked) => !prevOsInstructionsClicked
        );
    };

    return (
        <>
            <StartGamePopUp
                isShown={isStartGame}
                startGameMsg="WELCOME"
                pickNameMsg="Enter Your Nicknames"
                playerOneName={playerOneName}
                playerTwoName={playerTwoName}
                whenPlayer1EnteredName={onPlayer1NameEntered}
                whenPlayer2EnteredName={onPlayer2NameEntered}
                scoreToWinChange={onInputChange}
                scoreToWin={scoreToWin}
                startGame={startGame}
            ></StartGamePopUp>
            <EndGamePopUp
                isShown={isEndGame}
                handleReset={onResetGame}
                winner={winningPlayer}
            ></EndGamePopUp>
            <HowToPlayPopUp
                isShown={isInstructionsClicked}
                onCloseWindow={changeInstructionsState}
            ></HowToPlayPopUp>
            <div className="bg-container"></div>
            <div className="game-container">
                <i
                    className="fa-solid fa-question"
                    onClick={changeInstructionsState}
                ></i>

                <Player
                    name={playerOneName}
                    totalScore={totalScores[0]}
                    currScore={activePlayer === 0 ? currScore : 0}
                ></Player>
                <GamePanel
                    range={[1, 6]}
                    onRollDice={onRollDice}
                    onEndTurn={onEndTurn}
                    onResetGame={onResetGame}
                    isGameEnded={isEndGame}
                    hasRollDice={hasRollDice}
                    scoreToWinTitle={scoreToWin}
                    disableButtons={musicPlaying}
                ></GamePanel>
                <Player
                    name={playerTwoName}
                    totalScore={totalScores[1]}
                    currScore={activePlayer === 1 ? currScore : 0}
                ></Player>
            </div>
        </>
    );
};

export default Game;
