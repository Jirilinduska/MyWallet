import { useEffect, useState } from "react"
import Clock from "react-clock";
import "react-clock/dist/Clock.css"

const CurrentTime = () => {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date())
        }, 60000) // Every 60sec
    
        return () => clearInterval(interval)
      }, [])

  return (
    <div className="w-[40px]">
      <Clock value={time} renderNumbers={false} />
    </div>
  )
}

export default CurrentTime