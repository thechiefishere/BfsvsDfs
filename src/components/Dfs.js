import React from "react";
import Box from "./Box";
import { useGlobalContext } from "../context";

const Dfs = () => {
  const { arr, dfsCompleted, dfsCompletionTime } = useGlobalContext();

  return (
    <section className="cont">
      <h1>
        {dfsCompleted
          ? `Depth First Search Completed in ${dfsCompletionTime - 1} seconds`
          : "Depth First Searching..."}
      </h1>
      <article className="box-list">
        {arr.map((val) => {
          return <Box key={val} boxNum={val} type="dfs" />;
        })}
      </article>
    </section>
  );
};

export default Dfs;
