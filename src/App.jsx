import { useState } from "react";
import ForkJoin from "./ForkJoin";
import { catchError, of } from "rxjs";
import { mergeMap, retry } from "rxjs/operators";
import "./App.css";

function App() {
  const [isInfo, setIsInfo] = useState(false);
  const [displayProp, setdisplayProp] = useState("none");

  const fetchUser = () => {
    let res1 = fetch("https://jsonplaceholder.typicode.com/todos/1");
    console.log(res1);
    return res1;
  };

  const onClick = () => {
    fetchUser();
  };

  return (
    <div
      className="main"
      style={{ display: "flex", gap: "5rem", flexWrap: "wrap" }}
    >
      <div className="App">
        {/* <button onClick={onClick}>fetch (simple)</button> */}

        {/* <div className="info" style={{ display: `${displayProp}` }}>
          {isInfo ? "All Results arrived!" : "waiting for results..."}
        </div> */}
      </div>

      <ForkJoin />
    </div>
  );
}

export default App;
