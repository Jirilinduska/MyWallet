import { useUserContext } from "../../../../context/UserContext"
import { usePageTitle } from "../../../../hooks/usePageTitle"
import { useCompleteProfile } from "../../../../hooks/useCompleteProfile"
import { formatLang } from "../../../../utils/functions/formatLang"
import { Button, Typography } from "@mui/material"
import ExpenseInfoMUI from "../../ExpenseInfo/ExpenseInfoMUI"

const HeroLoggedMUI = () => {

  const { userData, userLangID } = useUserContext()

  usePageTitle("Home")
  useCompleteProfile()

  return (
    <div className="flex items-center justify-center gap-8 flex-col min-h-screen w-full animate-fadeIn">

      {userData && 
        <Typography variant="h3" mb={4} mt={6} fontWeight={600}>
          { formatLang(userLangID, `Vítej zpět ${userData.userName}!`, `Welcome back ${userData.userName}!`) }
        </Typography>
      }
      
      <ExpenseInfoMUI />

      <Button
        href="/dashboard/overview"
        variant="contained"
        color="primary"
        sx={{ width: 250, mb: 10 }}
      >
        {formatLang(userLangID, "Přehled", "Dashboard")}
      </Button>

    </div>
  )
}

export default HeroLoggedMUI