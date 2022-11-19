import { useState } from "react";
import { forkJoin, delayWhen, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { retry, retryWhen, map, tap } from "rxjs/operators";
import "./App.css";

export default function ForkJoin() {
  const [isInfo, setIsInfo] = useState(false);
  const [displayProp, setdisplayProp] = useState("none");

  let retryCount = 0;
  const fetchUser = () => {
    return ajax({
      url: "http://localhost",
      method: "GET",
    }).pipe(
      map((res) => {
        if (res.response.msg === "pending") {
          retryCount++;
          throw res.response.msg;
        }
        console.log("Results arrived");
        return res.response.msg;
      }),

      retryWhen((errors) =>
        errors.pipe(
          tap(() => console.log("Retrying...", retryCount)),
          delayWhen(() => timer(3000))
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
          console.log(value);
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
