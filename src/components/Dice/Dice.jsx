import "./Dice.css";

const Dice = ({ diceVal }) => {
    return (
        <div className="dice-img-container">
            <img
                alt=""
                src={require(`../../assets/dice/dice-${diceVal}.png`)}
            />
        </div>
    );
};

export default Dice;
