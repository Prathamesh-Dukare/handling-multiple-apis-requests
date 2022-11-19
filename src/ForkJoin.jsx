import { useState } from "react";
import { forkJoin } from "rxjs";
import { ajax } from "rxjs/ajax";
import { retry, retryWhen, map, tap } from "rxjs/operators";
import "./App.css";

export default function ForkJoin() {
  const [isInfo, setIsInfo] = useState(false);
  const [displayProp, setdisplayProp] = useState("none");

  const fetchUser = () => {
    return (
      ajax({
        url: "https://nodeserver.prathameshdukare.repl.co",
        method: "GET",
      }).pipe(
        map((res) => {
          if (res.response.msg === "pending") {
            throw res.response;
          }
          return res.response;
        })
      ),
      retryWhen((errors) =>
        errors.pipe(
          //log error message
          tap((val) => console.log(`Value ${val} was too high!`))
          //restart in 6 seconds
        )
      )
    );
  };
  const fetchCoffee = () => {
    return ajax({
      url: "https://api.sampleapis.com/coffee/hot",
      method: "GET",
    }).pipe(retry(3));
  };
  const fetchBeers = () => {
    return ajax({
      url: "https://api.sampleapis.com/beers/ale",
      method: "GET",
    }).pipe(retry(3));
  };

  const fetchAllAPis = () => {
    const observable = forkJoin({
      user: fetchUser(),
      coffee: fetchCoffee(),
      beers: fetchBeers(),
    });

    observable.subscribe(
      {
        next: (value) => {
          console.log("value", value);
          setIsInfo(true);
        },
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const onClick = async () => {
    setIsInfo(false);
    setdisplayProp("block");
    fetchAllAPis();
  };

  return (
    <div className="app2">
      <button onClick={onClick}>fetch (ForkJoin)</button>

      <div className="info" style={{ display: `${displayProp}` }}>
        {isInfo ? "All Results arrived!" : "waiting for results..."}
      </div>
    </div>
  );
}
