import { forkJoin, of, timer } from 'rxjs';

const fetchUser = async () => {
    let res1 = await nodefetch('https://jsonplaceholder.typicode.com/todos/1')
    console.log(res1)
    return res1
}
const fetchCoffee = async () => {
    let res2 = await fetch('https://api.sampleapis.com/coffee/hot')
    return res2
}
const fetchBeers = async () => {
    let res3 = await fetch('https://api.sampleapis.com/beers/ale')
    return res3
}

const observable = forkJoin({
    user: fetchUser(),
    coffee: fetchCoffee(),
    beers: fetchBeers()
});
observable.subscribe({
    next: value => console.log(value),
    complete: () => console.log('This is how it ends!'),
});
