import { useState, createContext } from "react";

export const gameContext = createContext();

const ContextProvider = ({ children }) => {
    const [totalScores, setTotalScores] = useState([0, 0]);
    const [activePlayer, setActivePlayer] = useState(0);
    const [currScore, setCurrScore] = useState(0);
    const [scoreToWin, setScoreToWin] = useState(100);
    const [isEndGame, setIsEndGame] = useState(false);
    const [winningPlayer, setWinningPlayer] = useState(null);
    const [hasRollDice, setHasRollDice] = useState(false);
    const [numOfDice, setNumOfDice] = useState(2);
    const [isStartGame, setIsStartGame] = useState(true);
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [isInstructionsClicked, setIsInstructionsClicked] = useState(false);

    return (
        <gameContext.Provider
            value={{
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
            }}
        >
            {children}
        </gameContext.Provider>
    );
};

export default ContextProvider;
