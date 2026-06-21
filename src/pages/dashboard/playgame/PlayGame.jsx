import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import "./PlayGame.css";
import { Link } from "react-router-dom";

const PlayGame = () => {
  const [games] = useState([
    { name: "KERLA", last: "06:00 AM", result: "09:00 AM" },
    { name: "HEADRABAD", last: "9:00 AM", result: "12:00 PM" },
    { name: "AHMDABAD", last: "12:00 PM", result: "03:00 PM" },
    { name: "GOA", last: "03:00 PM", result: "06:00 PM" },
    { name: "MUMBAI", last: "06:00 PM", result: "09:00 PM" },
    { name: "KOLKATA", last: "09:00 PM", result: "12:00 AM" },
  ]);

  const [sortedGames, setSortedGames] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const parseTimeToDate = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  useEffect(() => {
    const updateGameStatus = () => {
      const now = new Date();
      setCurrentTime(now);

      const updatedGames = games.map((game) => {
        const lastTime = parseTimeToDate(game.last);
        const resultTime = parseTimeToDate(game.result);
        
        // 🔥 Bet Close Time = Result Time - 15 minutes
        const betCloseTime = new Date(resultTime.getTime() - 30 * 60 * 1000);

        const isOpen = now >= lastTime && now < betCloseTime;
        const isBetClose = now >= betCloseTime && now < resultTime;
        const isResult = now >= resultTime;
        const isUpcoming = now < lastTime;

        return {
          ...game,
          lastTime,
          resultTime,
          betCloseTime,
          isOpen,
          isBetClose,
          isResult,
          isUpcoming,
          timeDiff: Math.abs(resultTime - now),
        };
      });

      const sorted = updatedGames.sort((a, b) => {
        if (a.isOpen && !b.isOpen) return -1;
        if (!a.isOpen && b.isOpen) return 1;
        if (a.isBetClose && !b.isBetClose) return -1;
        if (!a.isBetClose && b.isBetClose) return 1;
        if (a.isResult && !b.isResult) return -1;
        if (!a.isResult && b.isResult) return 1;
        if (a.isUpcoming && b.isUpcoming) return a.lastTime - b.lastTime;
        return 0;
      });

      setSortedGames(sorted);
    };

    updateGameStatus();
    const timer = setInterval(updateGameStatus, 1000);
    return () => clearInterval(timer);
  }, [games]);

  const getTimeRemaining = (targetTime) => {
    const now = new Date();
    const diff = targetTime - now;
    if (diff <= 0) return "00:00:00";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const nextGame = sortedGames.find((game) => game.isUpcoming);

  const getStatusLabel = (game) => {
    if (game.isOpen) return "🟢 Open Bet";
    if (game.isBetClose) return "🟡 Bet Close";
    if (game.isResult) return "🔴 Result";
    return "⏳ Upcoming";
  };

  return (
    <div className="playgame-wrapper">
      <div className="top-header">
        <h2>All Game</h2>
        <button className="my-playgame-btn">My Playgame</button>
      </div>

      <div className="current-time-display">
        <span>🕐 Current Time: {currentTime.toLocaleTimeString()}</span>
      </div>

      {sortedGames.map((game, index) => {
        const isNextGame = nextGame && nextGame.name === game.name;

        return (
          <div key={index}>
            {game.isUpcoming && sortedGames[index - 1]?.isOpen && (
              <div className="upcoming-label">
                <span>⬇️ Upcoming Games</span>
              </div>
            )}

            <div
              className={`game-card ${game.isOpen ? "active-card" : ""} ${
                game.isUpcoming ? "upcoming-card" : ""
              } ${game.isBetClose ? "betclose-card" : ""} ${game.isResult ? "result-card" : ""}`}
            >
              <div className="game-left">
                <div className="game-name-wrapper">
                  <h3>{game.name}</h3>
                  <span className={`status-badge ${
                    game.isOpen ? "status-live" : 
                    game.isBetClose ? "status-betclose" :
                    game.isResult ? "status-result" : 
                    "status-upcoming"
                  }`}>
                    {getStatusLabel(game)}
                  </span>
                  {game.isUpcoming && isNextGame && (
                    <span className="status-badge status-next">🔥 Next</span>
                  )}
                </div>
                <p>
                  <FaClock className="icon" /> Start Bet: {game.last}
                </p>
                <p>
                  <IoTimeSharp className="icon result-icon" /> Result: {game.result}
                </p>
                {game.isOpen && (
                  <p className="time-remaining">
                    ⏱️ Ends in: {getTimeRemaining(game.betCloseTime)}
                  </p>
                )}
                {game.isUpcoming && isNextGame && (
                  <p className="time-remaining">
                    ⏳ Starts in: {getTimeRemaining(game.lastTime)}
                  </p>
                )}
              </div>

              <div className="game-right">
                {game.isOpen ? (
                  <Link to="/NumberGrid" state={{ gameName: game.name }}>
                    <button className="play-btn">▶ Play Game</button>
                  </Link>
                ) : game.isUpcoming ? (
                  <button className="upcoming-btn">⏳ Upcoming</button>
                ) : (
                  <button className="timeup-btn">🔒 Bet Close</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayGame;