import React, { useState } from "react";
import { useGlobalContext } from "../context";

const MazeTotal = () => {
  const [mazeTotal, setMazeTotal] = useState(10);
  const { setSquareVal, reset, squareVal, setRestart, restart } =
    useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (squareVal == parseInt(mazeTotal)) {
      setRestart(!restart);
      return;
    }
    if (!mazeTotal || parseInt(mazeTotal) < 10) {
      setSquareVal(10);
    } else if (parseInt(mazeTotal) > 30) {
      setSquareVal(30);
    } else {
      setSquareVal(parseInt(mazeTotal));
    }
    reset();
  };

  return (
    <section className="total">
      <form className="form" onSubmit={handleSubmit}>
        <label>Number Of Mazes:</label>
        <input
          type="number"
          min="10"
          max="30"
          value={mazeTotal}
          onChange={(e) => setMazeTotal(e.target.value)}
        />
        <button className="btn">Send</button>
      </form>
    </section>
  );
};

export default MazeTotal;
