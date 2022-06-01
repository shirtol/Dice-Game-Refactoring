import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";
import "./EndGamePopUp.css";

const EndGamePopUp = ({ isShown, winner, handleReset }) => {
    return (
        <PopUp isShown={isShown} popupClass="end-game-popup-container">
            <h1 className="winning-msg">{`${winner} Won!`}</h1>
            <Button
                handleClick={handleReset}
                buttonText="NEW GAME"
                iconClass="fa-solid fa-rotate fa-2x"
            ></Button>
        </PopUp>
    );
};

export default EndGamePopUp;
