import { Box, Tab, Tabs } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"

const AdminTabs = () => {
    
  const navigate = useNavigate()
  const location = useLocation()

  const { userLangID } = useUserContext()

  const paths = ["/admin", "/admin/users"]
  const [value, setValue] = useState(0)

  useEffect(() => {
    const currentPath = location.pathname
    const index = paths.indexOf(currentPath)
    if (index !== -1) {
      setValue(index)
    }
  }, [location.pathname])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    navigate(paths[newValue])
  }

  return (
    <Box sx={{ width: "100%" }} mb={6}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Dashboard" />
        <Tab label={formatLang(userLangID, "Uživatelé", "Users")} />
      </Tabs>
    </Box>
  )
}

export default AdminTabs
