import { Box, Typography } from "@mui/material"
import { IconCard, IconChart, IconWallet } from "../../../../utils/icons/icons"
import AuthForm from "../../../Forms/AuthForm/AuthForm"
import { useState } from "react"
import { usePageTitle } from "../../../../hooks/usePageTitle"

const HeroNotLoggedMUI = () => {

    const [isLogin, setIsLogin] = useState(true)
    const toggleIsLogin = () => setIsLogin(!isLogin)

    usePageTitle(`${isLogin ? "Log In" : "Sign In"}`)


  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" height="100%" flexDirection={{ xs: "column", md: "row" }}>
        
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100%" width={{ xs: "100%", md: "50%" }}>

            <Typography variant="h2" fontWeight={600} mb={6}>My wallet</Typography>

            <Typography variant="body1" display="flex" alignItems="center" gap={1} mb={2}>
                <IconChart className="text-2xl text-colorMain" />
                Plan your budgets with ease
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center" gap={1} mb={2}>
                <IconCard className="text-2xl text-colorMain" />
                Take control of your finances
            </Typography>

            <Typography variant="body1" display="flex" alignItems="center" gap={1} mb={2}>
                <IconWallet className="text-2xl text-colorMain" />
                Organize your daily expenses
            </Typography>

        </Box>
        
        <Box width={{ xs: "100%", lg: "50%" }} display="flex" alignItems="center" justifyContent="center">
            <AuthForm  
                isLogin={isLogin}
                toggleIsLogin={toggleIsLogin}
            />
        </Box>

    </Box>
  )
}

export default HeroNotLoggedMUI