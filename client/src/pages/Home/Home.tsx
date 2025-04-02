import { useEffect, useState } from "react"
import HeroLogged from "../../components/UI/Hero/HeroLogged/HeroLogged"
import { Box } from "@mui/material"
import HeroNotLoggedMUI from "../../components/UI/Hero/HeroNotLogged/HeroNotLoggedMUI"

const Home = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }, [] )

  return (
    <Box
      height="100vh"
      bgcolor="background.primary"
    >
      {isLoggedIn ? <HeroLogged /> : <HeroNotLoggedMUI/>}
    </Box>
  )
}

export default Home