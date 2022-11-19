import { interval, map, retryWhen, tap, delayWhen, timer } from "rxjs";

const source = interval(1000);
const result = source.pipe(
  map((value) => {
    if (value > 3) {
      throw value;
    }
    return value;
  }),
  retryWhen((errors) => {
    console.log("errors", errors);
    return errors.pipe(
      // log error message
      tap((value) => console.log(value, "value"))
    );
  })
);

result.subscribe((value) => console.log(value));

// results:
// 0
// 1
// 2
// 3
// 4
// 5
// 'Value 6 was too high!'
// - Wait 5 seconds then repeat
