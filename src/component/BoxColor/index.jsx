import React, { useState } from 'react';
import './BoxColor.scss'

BoxColor.propTypes = {
    
};

function getRandomColor(){
    const COLOR_LIST = ['yellow',"green","blue","red","deeppink"];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function BoxColor() {
    const initColor = localStorage.getItem("box-color")
    const [color,setColor] = useState(initColor);

    function handleBoxClick(){
        const newBoxColor = getRandomColor();        
        setColor(newBoxColor);
        localStorage.setItem("box-color",newBoxColor)
    }

    return (
        <div
        className="box-color"
        style={{backgroundColor:color}}
        onClick={handleBoxClick}
        >
            Box BoxColor
        </div>
    );
}

export default BoxColor;