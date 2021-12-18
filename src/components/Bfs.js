import React from "react";
import Box from "./Box";
import { useGlobalContext } from "../context";

const Bfs = () => {
  const { arr, bfsCompleted, bfsCompletionTime } = useGlobalContext();

  return (
    <section className="cont">
      <h1>
        {bfsCompleted
          ? `Breadth first Search Completed in ${bfsCompletionTime - 1} seconds`
          : "Breadth First Searching..."}
      </h1>
      <article className="box-list">
        {arr.map((val) => {
          return <Box key={val} boxNum={val} type="bfs" />;
        })}
      </article>
    </section>
  );
};

export default Bfs;
