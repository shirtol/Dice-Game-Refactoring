import "./Button.css";

const Button = ({ handleClick, disabled, iconClass, buttonText }) => {
    return (
        <div
            className="btn-container"
            onClick={handleClick}
            disabled={disabled}
        >
            <i className={iconClass}></i>
            <h3>{buttonText}</h3>
        </div>
    );
};

export default Button;
