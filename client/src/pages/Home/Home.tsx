import { useEffect, useState } from "react"
import HeroLogged from "../../components/UI/Hero/HeroLogged/HeroLogged"
import HeroNotLogged from "../../components/UI/Hero/HeroNotLogged/HeroNotLogged"

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }, [] )

  return (
    <section className="h-screen mx-auto flex items-center justify-center flex-col">
      {isLoggedIn ? <HeroLogged /> : <HeroNotLogged />}
    </section>
  )
}

export default Home