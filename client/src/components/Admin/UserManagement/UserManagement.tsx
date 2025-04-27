import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useOutletContext } from "react-router-dom"
import { IAdminData } from "../../../utils/interfaces/interfaces"
import { IconAdmin, IconDelete, IconEmailRead, IconEyeShow, IconProfileComplete } from "../../../utils/icons/icons"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { handleDeleteUserByAdmin } from "../../../API/Settings"

const UserManagement = () => {

    const { userLangID } = useUserContext()
    const data = useOutletContext<IAdminData | null>()

    if(!data) return <>Loading....</>

  return (
    <Box pb={10}>
        
        <Typography variant='h6' fontWeight={600} mb={6}>
            User management
        </Typography>

        <Box bgcolor="background.paper">
            {data.allUsersData.length === 0 
                ? <Typography>{formatLang(userLangID, "Žádní uživatelé", "No active users")}</Typography>
                : data.allUsersData.map(x => (

                <Accordion key={x._id}>
                    <AccordionSummary
                        expandIcon={<IconEyeShow />}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography component="span" fontWeight={600}>{x.userName}</Typography>
                        {x.isAdmin && <Tooltip title="Admin"><span><IconAdmin/></span></Tooltip>}
                      </Box>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                        <Divider/>

                        <Typography mt={2} mb={1}>{formatLang(userLangID, "Naposledy online", "Last time seen")}: {x.lastOnline}</Typography>
                        <Typography mb={1}>Email adress: {x.email}</Typography>
                        
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconEmailRead color={x.settings.emailConfirmed ? "green" : "black"} size={20} />
                            <Typography>{x.settings.emailConfirmed ? formatLang(userLangID, "Email ověřený", "Email confirmed") : formatLang(userLangID, "Email neověřený", "Email not confirmed")}</Typography>
                        </Stack>
                        
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconProfileComplete color={x.settings.profileCompleted ? "green" : "black"} size={20} />
                            <Typography>{x.settings.emailConfirmed ? formatLang(userLangID, "Profil vyplněný", "Profile completed") : formatLang(userLangID, "Profil nevyplněný", "Profile not completed")}</Typography>
                        </Stack>

                        <Stack mb={2} direction="row" alignItems="center" spacing={1}>
                            <IconDelete color={x.settings.canBeDeleted ? "black" : "red"} size={20} />
                            <Typography>{x.settings.canBeDeleted ? formatLang(userLangID, "Smazatelný", "Can de deleted") : formatLang(userLangID, "Nesmazatelný", "Can't be deleted")}</Typography>
                        </Stack>

                        <Box display="flex" alignItems="center" gap={1}>

                            <Tooltip title={`Delete user ${x.userName}`}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteUserByAdmin(x.userName)}
                                >
                                    <IconDelete/>
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </AccordionDetails>
                </Accordion>
                ))
            }
        </Box>
    </Box>
  )
}

export default UserManagement