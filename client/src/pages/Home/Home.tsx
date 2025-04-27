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
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
      width="100%"
      minHeight="100vh"
    >
      {isLoggedIn ? <HeroLoggedMUI /> : <HeroNotLoggedMUI/>}
    </Box>
  )
}

export default Home