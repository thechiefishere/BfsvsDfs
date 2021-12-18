import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [squareVal, setSquareVal] = useState(10);
  const [arr, setArr] = useState([]);
  const [targetNum, setTargetNum] = useState(0);
  const [startingNum, setStartingNum] = useState(0);
  const [restart, setRestart] = useState(false);

  const [queue, setQueue] = useState([]);
  const [visitedBfs, setVisitedBfs] = useState([]);
  const [targetFoundBfs, setTargetFoundBfs] = useState(false);
  const [initQueueBfs, setInitQueueBfs] = useState(true);
  const [reflectVisitedBfs, setReflectVisitedBfs] = useState([]);
  const [bfsCompleted, setBfsCompleted] = useState(false);
  const [bfsCompletionTime, setBfsCompletionTime] = useState(0);

  const [stack, setStack] = useState([]);
  const [visitedDfs, setVisitedDfs] = useState([]);
  const [targetFoundDfs, setTargetFoundDfs] = useState(false);
  const [initStackDfs, setInitStackDfs] = useState(true);
  const [reflectVisitedDfs, setReflectVisitedDfs] = useState([]);
  const [dfsCompleted, setDfsCompleted] = useState(false);
  const [dfsCompletionTime, setDfsCompletionTime] = useState(0);

  const getRandomNum = () => {
    return Math.floor(Math.random() * Math.pow(squareVal, 2)) + 1;
  };

  useEffect(() => {
    setArr([]);
    for (let i = 1; i <= squareVal * squareVal; i++) {
      setArr((arr) => [...arr, i]);
    }
    setStartingNum(getRandomNum());
    setTargetNum(getRandomNum());
    reset();
  }, [squareVal, restart]);

  useEffect(() => {
    if (!targetFoundBfs) {
      let tempVisitedBfs = visitedBfs;
      let tempQueue = queue;

      if (startingNum === 0) return;
      if (initQueueBfs) {
        tempQueue.push(startingNum);
        setInitQueueBfs(false);
      }

      while (tempQueue.length > 0) {
        const curr = tempQueue.shift();
        if (tempVisitedBfs.indexOf(curr) >= 0) {
          continue;
        }

        if (curr === targetNum) {
          setTargetFoundBfs(true);
          break;
        }
        tempVisitedBfs.push(curr);
        const currNeighbours = getNeighbours(curr, "bfs");
        tempQueue.push(...currNeighbours);
      }
      tempVisitedBfs.push(targetNum);
      setVisitedBfs([...tempVisitedBfs]);
      setQueue([]);
    }
  }, [startingNum, queue]);

  useEffect(() => {
    if (!targetFoundDfs) {
      let tempVisitedDfs = visitedDfs;
      let tempStack = stack;

      if (startingNum === 0) return;
      if (initStackDfs) {
        tempStack.push(startingNum);
        setInitStackDfs(false);
      }

      while (tempStack.length > 0) {
        const curr = tempStack.pop();
        if (tempVisitedDfs.indexOf(curr) >= 0) {
          continue;
        }

        if (curr === targetNum) {
          setTargetFoundDfs(true);
          break;
        }
        tempVisitedDfs.push(curr);
        const currNeighbours = getNeighbours(curr, "dfs");
        tempStack.push(...currNeighbours);
      }
      tempVisitedDfs.push(targetNum);
      setVisitedDfs([...tempVisitedDfs]);
      setStack([]);
    }
  }, [startingNum, stack]);

  const getNeighbours = (num, type) => {
    let neighbours = [];
    if (num - 10 > 0) {
      neighbours.push(num - 10);
    }
    if (num + 10 <= squareVal * squareVal) {
      neighbours.push(num + 10);
    }
    if (num.toString().endsWith("0")) {
      neighbours.push(num - 1);
    } else if (num.toString().endsWith("1")) {
      if (num + 1 <= squareVal * squareVal) {
        neighbours.push(num + 1);
      }
    } else {
      neighbours.push(num - 1);
      if (num + 1 <= squareVal * squareVal) {
        neighbours.push(num + 1);
      }
    }

    if (type === "bfs") {
      neighbours = neighbours.filter((val) => {
        if (visitedBfs.indexOf(val) < 0) {
          return val;
        }
      });
    } else if (type === "dfs") {
      neighbours = neighbours.filter((val) => {
        if (visitedDfs.indexOf(val) < 0) {
          return val;
        }
      });
    }

    return neighbours;
  };

  useEffect(() => {
    let id = "";
    if (targetFoundBfs && visitedBfs.length > 0) {
      id = setTimeout(() => {
        const val = visitedBfs.shift();
        setVisitedBfs((visitedBfs) => [...visitedBfs]);
        setReflectVisitedBfs((reflectVisitedBfs) => [
          ...reflectVisitedBfs,
          val,
        ]);
        setBfsCompletionTime((bfsCompletionTime) => bfsCompletionTime + 1);
      }, 1000);
      if (visitedBfs.length === 1) {
        setBfsCompleted(true);
      }
    }
    return () => {
      clearTimeout(id);
    };
  }, [targetFoundBfs, visitedBfs]);

  useEffect(() => {
    let id = "";
    if (targetFoundDfs && visitedDfs.length > 0) {
      id = setTimeout(() => {
        const val = visitedDfs.shift();
        setVisitedDfs((visitedDfs) => [...visitedDfs]);
        setReflectVisitedDfs((reflectVisitedDfs) => [
          ...reflectVisitedDfs,
          val,
        ]);
        setDfsCompletionTime((dfsCompletionTime) => dfsCompletionTime + 1);
      }, 1000);
      if (visitedDfs.length === 1) {
        setDfsCompleted(true);
      }
    }
    return () => {
      clearTimeout(id);
    };
  }, [targetFoundDfs, visitedDfs]);

  const reset = () => {
    setVisitedBfs([]);
    setTargetFoundBfs(false);
    setInitQueueBfs(true);
    setReflectVisitedBfs([]);
    setBfsCompleted(false);
    setBfsCompletionTime(0);

    setVisitedDfs([]);
    setTargetFoundDfs(false);
    setInitStackDfs(true);
    setReflectVisitedDfs([]);
    setDfsCompleted(false);
    setDfsCompletionTime(0);
  };

  return (
    <AppContext.Provider
      value={{
        squareVal,
        setSquareVal,
        arr,
        startingNum,
        targetNum,
        reflectVisitedBfs,
        reflectVisitedDfs,
        bfsCompleted,
        dfsCompleted,
        bfsCompletionTime,
        dfsCompletionTime,
        reset,
        setRestart,
        restart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
