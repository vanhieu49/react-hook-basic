import React, { useEffect, useState } from 'react';

function formatTime(date){
    const hours = `${date.getHours()}`.slice(-2) 
    const minute = `${date.getMinutes()}`.slice(-2)
    const second = `${date.getSeconds()}`.slice(-2)

   return `${hours}:${minute}:${second}`;
}

function Clock(props) {
    const [timeString,setTimeString] = useState('');

    useEffect(()=>{
       const clockInterval = setInterval(() => {
           const now = new Date();
           const newTime = formatTime(now);
           setTimeString(newTime);
       }, 1000);

       return () => {
            console.log("Clean code")
            clearInterval(clockInterval)
       }
    },[])

    return (
        <div style={{fontSize:'48px'}}>
            {timeString}
        </div>
    );
}

export default Clock;