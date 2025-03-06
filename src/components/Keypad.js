import React from "react";
import "./Keypad.css";

const Keypad = ({ onKeyPress, onDelete }) => {
    return (
        <div className="keypad">
            {[1,2,3,4,5,6,7,8,9].map((num) => (
                <button key={num} className={`num${num}`} onClick={() => onKeyPress(num)}>
                    {num}
                </button>
            ))}
            <button className="num0" onClick={() => onKeyPress(0)}>0</button>
            <button className="delete" onClick={onDelete}>⌫</button>
        </div>
    );
};

export default Keypad;
