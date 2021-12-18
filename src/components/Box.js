import React from "react";
import { useGlobalContext } from "../context";

const Box = ({ boxNum, type }) => {
  const { startingNum, targetNum, reflectVisitedBfs, reflectVisitedDfs } =
    useGlobalContext();
  let reflectVisited = "";
  if (type === "bfs") {
    reflectVisited = reflectVisitedBfs;
  } else {
    reflectVisited = reflectVisitedDfs;
  }

  return (
    <div
      className={`box ${reflectVisited.indexOf(boxNum) > 0 && "visited"} ${
        boxNum === startingNum && "starting"
      } ${boxNum === targetNum && "target"}`}
    >
      {boxNum}
    </div>
  );
};

export default Box;
