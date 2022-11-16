import { useState } from 'react'
import ForkJoin from './ForkJoin'
import './App.css'

function App() {
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
      const allRes = await Promise.all([fetchUser(), fetchCoffee(), fetchBeers()])
      console.log('allRes', allRes)
      setIsInfo(true)
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
    <div className='main' style={{display:'flex',gap:'5rem',flexWrap:'wrap'}}>
      {/* <div className="App">
        <button onClick={onClick}>
          fetch (promise.all)
        </button>

        <div className="info" style={{ display: `${displayProp}` }}>
          {isInfo ? "All Results arrived!" : "waiting for results..."}
        </div>
      </div> */}

      {/* ForkJoin */}
      <ForkJoin />
    </div>
  )
}

export default App
