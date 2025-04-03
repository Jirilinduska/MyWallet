import { useEffect, useState } from "react"
import HeroLoggedMUI from "../../components/UI/Hero/HeroLogged/HeroLoggedMUI"
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
      // height="100vh"
      bgcolor="background.primary"
      minHeight="100vh"
    >
      {isLoggedIn ? <HeroLoggedMUI /> : <HeroNotLoggedMUI/>}
    </Box>
  )
}

export default Home