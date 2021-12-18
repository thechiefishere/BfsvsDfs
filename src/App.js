import { AppProvider } from "./context";
import Bfs from "./components/Bfs";
import Dfs from "./components/Dfs";
import MazeTotal from "./components/MazeTotal";

function App() {
  return (
    <AppProvider>
      <main className="main">
        <h1 className="main-title">BFS vs DFS Graph Algorithms</h1>
        <MazeTotal />
        <section className="main-searches">
          <Bfs />
          <Dfs />
        </section>
      </main>
    </AppProvider>
  );
}

export default App;
