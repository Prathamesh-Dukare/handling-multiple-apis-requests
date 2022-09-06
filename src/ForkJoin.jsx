import { useState } from 'react'
import { forkJoin } from 'rxjs';
import './App.css'

export default function ForkJoin() {
    const [isInfo, setIsInfo] = useState(false)
    const [displayProp, setdisplayProp] = useState("none")

    const fetchUser = async () => {
        let res1 = await fetch('https://jsonplaceholder.typicode.com/todos/1')
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

    const fetchAPis = async () => {
        try {
            const observable = forkJoin({
                user: fetchUser(),
                coffee: fetchCoffee(),
                beers: fetchBeers()
            });
            observable.subscribe({
                next: value => {
                    console.log(value)
                    setIsInfo(true)
                },
                // complete: value => console.log(value),
            });
            
        } catch {
            console.log("error resolving all responses")
        }
    }
    const onClick = () => {
        setIsInfo(false)
        setdisplayProp("block")
        fetchAPis()
    }
    return (

        <div className='app2'>
            <button onClick={onClick}>
                fetch (ForkJoin)
            </button>

            <div className="info" style={{ display: `${displayProp}` }}>
                {isInfo ? "All Results arrived!" : "waiting for results..."}
            </div>
        </div>

    )
}