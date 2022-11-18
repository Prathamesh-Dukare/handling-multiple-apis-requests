import ForkJoin from "./ForkJoin";
import "./App.css";

function App() {
  return (
    <div
      className="main"
      style={{ display: "flex", gap: "5rem", flexWrap: "wrap" }}
    >
      <ForkJoin />
    </div>
  );
}

export default App;
