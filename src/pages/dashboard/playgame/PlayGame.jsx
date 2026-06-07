import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import "./PlayGame.css";
import { Link } from "react-router-dom";

const PlayGame = () => {
  const [games, setGames] = useState([
    { name: "DISAWER", last: "03:00 AM", result: "05:20 AM" },
    { name: "DELHI BAZAR", last: "02:50 PM", result: "03:15 PM" },
    { name: "SHRI GANESH", last: "04:20 PM", result: "04:45 PM" },
    { name: "FARIDABAD", last: "05:45 PM", result: "06:10 PM" },
    { name: "GAZIYABAD", last: "08:55 PM", result: "09:30 PM" },
    { name: "GALI", last: "10:55 PM", result: "11:30 PM" },
  ]);

  const [playStatus, setPlayStatus] = useState({});

  useEffect(() => {
    const checkGameTime = () => {
      const now = new Date();
      const updatedStatus = {};

      games.forEach((game) => {
        const [time, period] = game.result.split(" ");
        let [hour, minute] = time.split(":").map(Number);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        const resultDate = new Date();
        resultDate.setHours(hour, minute, 0);

        updatedStatus[game.name] = now < resultDate;
      });

      setPlayStatus(updatedStatus);
    };

    checkGameTime();
    const timer = setInterval(checkGameTime, 1000);
    return () => clearInterval(timer);
  }, [games]);

  return (
    <div className="playgame-wrapper">
      <div className="top-header">
        <h2> All Game</h2>
        <button className="my-playgame-btn"> My Playgame</button>
      </div>

      {games.map((game, index) => (
        <div
          key={index}
          className={`game-card ${playStatus[game.name] ? "active-card" : "closed-card"}`}
        >
          <div className="game-left">
            <h3>{game.name}</h3>
            <p><FaClock className="icon" /> Last: {game.last}</p>
            <p><IoTimeSharp className="icon result-icon" /> Result: {game.result}</p>
          </div>

          <div className="game-right">
            {playStatus[game.name] ? (
              <Link to="/NumberGrid" state={{ gameName: game.name }}>
                <button className="play-btn"> Play Game</button>
              </Link>
            ) : (
              <button className="timeup-btn"> Time UP</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayGame;