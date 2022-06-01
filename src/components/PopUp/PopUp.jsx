import "./PopUp.css";

const PopUp = ({ isShown, popupClass, children }) => {
    return (
        isShown && (
            <div className={`pop-up-container ${popupClass}`}>
                <div>{children}</div>
            </div>
        )
    );
};

export default PopUp;
