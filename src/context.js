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
  const [isFirstElementInQueue, setIsFirstElementInQueue] = useState(true);
  const [reflectVisitedBfs, setReflectVisitedBfs] = useState([]);
  const [bfsCompleted, setBfsCompleted] = useState(false);
  const [bfsCompletionTime, setBfsCompletionTime] = useState(0);

  const [stack, setStack] = useState([]);
  const [visitedDfs, setVisitedDfs] = useState([]);
  const [targetFoundDfs, setTargetFoundDfs] = useState(false);
  const [isFirstElementInStack, setIsFirstElementInStack] = useState(true);
  const [reflectVisitedDfs, setReflectVisitedDfs] = useState([]);
  const [dfsCompleted, setDfsCompleted] = useState(false);
  const [dfsCompletionTime, setDfsCompletionTime] = useState(0);

  /**
   * generateRandomNumber generates a random number.
   * @returns a random number
   */
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * Math.pow(squareVal, 2)) + 1;
  };

  /**
   * Effect that set startingNum and TargetNum for both
   * algorithm through generateRandomNumber.
   */
  useEffect(() => {
    setArr([]);
    for (let i = 1; i <= squareVal * squareVal; i++) {
      setArr((arr) => [...arr, i]);
    }
    setStartingNum(generateRandomNumber());
    setTargetNum(generateRandomNumber());
    reset();
  }, [squareVal, restart]);

  useEffect(() => {
    if (targetFoundBfs) return;
    let visitedBfsClone = visitedBfs;
    let queueClone = queue;

    if (startingNum === 0) return;
    pushFirstElementToArray(
      isFirstElementInQueue,
      queueClone,
      startingNum,
      "bfs"
    );

    while (queueClone.length > 0) {
      const curr = queueClone.shift();
      if (visitedBfsClone.indexOf(curr) >= 0) {
        continue;
      }

      if (confirmTargetFound(curr, targetNum, "bfs")) break;

      visitedBfsClone.push(curr);
      const currNeighbours = getNeighbours(curr, "bfs");
      queueClone.push(...currNeighbours);
    }
    visitedBfsClone.push(targetNum);
    setVisitedBfs([...visitedBfsClone]);
    setQueue([]);
  }, [startingNum, queue]);

  useEffect(() => {
    if (!targetFoundDfs) {
      let visitedDfsClone = visitedDfs;
      let stackClone = stack;

      if (startingNum === 0) return;
      pushFirstElementToArray(
        isFirstElementInStack,
        stackClone,
        startingNum,
        "dfs"
      );

      while (stackClone.length > 0) {
        const curr = stackClone.pop();
        if (visitedDfsClone.indexOf(curr) >= 0) {
          continue;
        }

        if (confirmTargetFound(curr, targetNum, "dfs")) break;
        // if (curr === targetNum) {
        //   setTargetFoundDfs(true);
        //   break;
        // }
        visitedDfsClone.push(curr);
        const currNeighbours = getNeighbours(curr, "dfs");
        stackClone.push(...currNeighbours);
      }
      visitedDfsClone.push(targetNum);
      setVisitedDfs([...visitedDfsClone]);
      setStack([]);
    }
  }, [startingNum, stack]);

  /**
   * pushFirstElementToQueue adds the starting number to the queue.
   * @param {a boolean that shows if queue is empty} isFirstElementInQueue
   * @param {A temporary queue gotten from state queue. It can be updated without using setState.} queueClone
   * @param {A function for setting the isFirstElementInQueue} setIsFirstElementInQueue
   * @param {The starting point of the algorithm} startingNum
   * @param {determines if it's bfs or dfs} algorithm
   */
  const pushFirstElementToArray = (
    isFirstElementInArray,
    arrayClone,
    startingNum,
    algorithm
  ) => {
    if (isFirstElementInArray) {
      arrayClone.push(startingNum);
      if (algorithm === "bfs") setIsFirstElementInQueue(false);
      else setIsFirstElementInStack(false);
    }
  };

  /**
   * confirmTargetFound checks if the current number equals
   * the target number.
   * @param {The value of the current element or number} curr
   * @param {The target number} targetNum
   * @param {determines if it's bfs or dfs} algorithm
   * @returns
   */
  const confirmTargetFound = (curr, targetNum, algorithm) => {
    if (curr === targetNum) {
      if (algorithm === "bfs") setTargetFoundBfs(true);
      else setTargetFoundDfs(true);
      return true;
    }
    return false;
  };

  /**
   * getNeighbours returns all the element(numbers) adjacent to
   * num
   * @param {the number whoose neighbors are to be returned} num
   * @param {determines if it's bfs or dfs} algorithm
   * @returns
   */
  const getNeighbours = (num, algorithm) => {
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

    if (algorithm === "bfs") {
      neighbours = neighbours.filter((val) => {
        if (visitedBfs.indexOf(val) < 0) {
          return val;
        }
      });
    } else if (algorithm === "dfs") {
      neighbours = neighbours.filter((val) => {
        if (visitedDfs.indexOf(val) < 0) {
          return val;
        }
      });
    }

    return neighbours;
  };

  /**
   * Effect that handles the shading of all visitedBfs nodes at interval
   */
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

  /**
   * Effect that handles the shading of all visitedDfs nodes at interval
   */
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

  /**
   * Resets both boards whenever a new value is enterred
   * into the form.
   */
  const reset = () => {
    setVisitedBfs([]);
    setTargetFoundBfs(false);
    setIsFirstElementInQueue(true);
    setReflectVisitedBfs([]);
    setBfsCompleted(false);
    setBfsCompletionTime(0);

    setVisitedDfs([]);
    setTargetFoundDfs(false);
    setIsFirstElementInStack(true);
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
