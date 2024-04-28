import React, { useState, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import { GiPartyPopper } from "react-icons/gi";

import "./PomodoroTimer.css";
import TreeComponent from "./TreeComponent";

function PomodoroTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [message, setMessage] = useState("Plant a flower, now!");
  const [icon, setIcon] = useState(null);
  const [keyIndex, setKeyIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isBreak, setIsBreak] = useState(false); // New state variable
  const [userSetTime, setUserSetTime] = useState(25 * 60);
  const [isUserChange, setIsUserChange] = useState(true);

  // Update the useEffect hook to set isUserChange to false before changing totalTime and to true afterwards
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds < totalTime) {
            return seconds + 1;
          } else {
            setIsActive(false);
            setIsComplete(true);
            setIsUserChange(false); // Set isUserChange to false before changing totalTime
            if (!isBreak) {
              setIsBreak(true);
              setTotalTime(5 * 60); // Set timer to 5 minutes for break
              setMessage("Break time!");
              setIcon(
                <GiPartyPopper style={{ color: "red", fontWeight: "bold" }} />
              );
            } else {
              setIsBreak(false);
              setTotalTime(25 * 60); // Set timer to 25 minutes for work
              setMessage("Plant a flower, now!");
              setIcon(null);
            }
            // Use setTimeout to delay the call to setIsUserChange(true)
            setTimeout(() => setIsUserChange(true), 0);
            return 0;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, totalTime, isBreak]);

  useEffect(() => {
    const messages = [
      "Keep going, you got this!",
      "Almost there, keep pushing!",
      "You can do it, champ!",
      "Stay focused, almost there!",
      "Keep pushing, don't stop!",
      "Believe in yourself, always!",
      "Stay strong, keep going!",
      "Never give up, ever!",
      "Keep moving, don't quit!",
      "Stay positive, think big!",
      "Believe, achieve, and succeed!",
      "Hard work pays off!",
      "Your time is now!",
      "Make every second count!",
      "Plant a flower, now!",
      "Be productive, start now!",
      "Take a step, move!",
      "Start small, think big!",
      "Every minute, matters now!",
      "Time's ticking, start now!",
      "Seize the moment, now!",
      "Make it happen, now!",
    ];
    let messageIndex = 0;

    const intervalId = setInterval(() => {
      if (!isActive) {
        clearInterval(intervalId);
        return;
      }

      messageIndex = (messageIndex + 1) % messages.length;
      setMessage(messages[messageIndex]);
    }, (totalTime * 1000) / messages.length);

    return () => clearInterval(intervalId);
  }, [totalTime, isActive]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
    setIsComplete(false);
    setIsBreak(false); // Reset isBreak when timer is reset
    setTotalTime(25 * 60); // Reset timer to 25 minutes
    setKeyIndex(keyIndex + 1);
  };

  const skipBreak = () => {
    if (isBreak) {
      setSeconds(0);
      setIsActive(false);
      setIsComplete(false);
      setIsBreak(false);
      setTotalTime(userSetTime); // Reset timer to the user's set time limit
      setKeyIndex(keyIndex + 1);
    }
  };

  const handleTimeChange = (newValue) => {
    const newTime = newValue * 60;
    setTotalTime(newTime);
    if (isUserChange) {
      setUserSetTime(newTime); // Only update userSetTime if the change is initiated by the user
    }
  };

  const remainingTime = totalTime - seconds;
  const minutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime % 60;

  const timeArray = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <div className="pomodoro-timer">
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "15px",
          paddingTop: "15px",
          fontSize: "1.1rem",
        }}
      >
        {message === "Congratulations, you did it!" && icon}
        {message}
        {message === "Congratulations, you did it!" && icon}
      </div>
      <div style={{ position: "relative" }}>
        <CircularSlider
          label="P"
          labelColor="#8C96A2"
          knobColor="#f61067ff"
          progressColorFrom="#0fc9e2ff"
          progressColorTo="#0fc9e2ff"
          progressSize={30}
          trackColor="#213453ff"
          trackSize={30}
          max={59}
          data={timeArray}
          dataIndex={totalTime / 60 - 1}
          onChange={handleTimeChange}
          style={{ zIndex: 1 }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <TreeComponent
            key={keyIndex} // Use keyIndex as key
            duration={totalTime * 1000}
            isActive={isActive}
            isComplete={isComplete} // Pass isComplete as prop
          />
        </div>
      </div>
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{`${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`}</div>

      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            setIsActive(!isActive);
            if (isActive) {
              setIsComplete(false); // Reset isComplete when timer starts
            }
          }}
        >
          {isActive ? "Pause" : "Plant"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
        {isBreak && (
          <button className="button" onClick={skipBreak}>
            Skip Break
          </button>
        )}
      </div>
    </div>
  );
}

export default PomodoroTimer;
