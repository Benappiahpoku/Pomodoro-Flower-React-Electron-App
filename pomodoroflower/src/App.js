
import React from "react";
import "./App.css";
import PomodoroTimer from "./components/PomodoroTimer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PomodoroTimer />
        <footer className="footer">
          <img className="footer-logo" src="logo.png" alt="Your Logo" />
          <p className="footer-text">
            <code>Appiah-Poku B. © {new Date().getFullYear()}</code>
          </p>
        </footer>
      </header>
    </div>
  );
}

export default App;
