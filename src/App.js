import React from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

import "./styles.css";

class Timer {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

// observables can be passed into components as props
const TimerView = observer(({ timer }) => {
  return <span>Seconds passed: {timer.secondsPassed}</span>;
});

export default function App() {
  const myTimer = new Timer();
  const TIME_IN_MS = 1000;

  function startTimer() {
    this.startTimerInterval = setInterval(function () {
      myTimer.increaseTimer();
    }, TIME_IN_MS);
  }

  function resetTimer() {
    myTimer.reset();
    clearInterval(this.startTimerInterval);
  }

  return (
    <div className="App">
      <h1>Hello Time Bomb!</h1>
      <TimerView timer={myTimer} />
      <br />
      <button onClick={(e) => startTimer()}>Start Timer</button> &nbsp;
      <button onClick={(e) => resetTimer()}>Reset Timer</button>
    </div>
  );
}
