import { Box, Button, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import { IAdminData } from '../../../utils/interfaces/interfaces'
import InfoItemMUI from '../../UI/InfoItem/InfoItemMUI'
import { useUserContext } from '../../../context/UserContext'
import { formatLang } from '../../../utils/functions/formatLang'
import { IconCard, IconDB, IconUser } from '../../../utils/icons/icons'
import { useEffect, useState } from 'react'
import { handleUpdateAppSettings } from '../../../API/Settings'

const AdminDashboard = () => {

    const { userLangID } = useUserContext()
    const data = useOutletContext<IAdminData | null>()

    const [isEdited, setIsEdited] = useState(false)
    const [appSettings, setAppSettings] = useState({
        allowRegistration: data?.appSettings.allowRegistration || false,
        isMaintenance: data?.appSettings.isMaintenance || false
    })

    const handleSubmitSettings = async() => {
        await handleUpdateAppSettings(appSettings)
        setIsEdited(false)
        
    }

    useEffect(() => {
        if (data?.appSettings) {
            setAppSettings({
                allowRegistration: data.appSettings.allowRegistration,
                isMaintenance: data.appSettings.isMaintenance
            })
        }
    }, [data])

    if(!data) return <>Loading....</>
    
  return (
    <Box>

        <Typography variant='h6' fontWeight={600} mb={6}>
            Admin dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={6}>
            
            <InfoItemMUI
                amount={data.usersCount}
                color='info'
                formatToCurrency={false}
                isExpense={false}
                title={formatLang(userLangID, "Uživatelé", "Users")}
                icon={<IconUser/>}
            />

<           InfoItemMUI
                amount={data.dbData.usagePercent}
                color='info'
                formatToCurrency={false}
                isExpense={false}
                title={`${data.dbData.storageUsedMB}/${data.dbData.MAX_STORAGE_MB} MB`}
                formatToPercent
                icon={<IconDB/>}
            />
            
            <InfoItemMUI
                amount={data.dbData.collections}
                color='info'
                formatToCurrency={false}
                isExpense={false}
                title={formatLang(userLangID, "Počet kolekcí", "Collections")}
                icon={<IconDB/>}
            />

            <InfoItemMUI
                amount={data.dbData.objects}
                color='info'
                formatToCurrency={false}
                isExpense={false}
                title={formatLang(userLangID, "Počet objektů", "Objects")}
                icon={<IconDB/>}
            />

        </Box>

        <Box display="flex" alignItems="center" gap={2} my={6}> 

            <Typography variant='h6' fontWeight={600}>
                App settings
            </Typography>

            <Button
                variant='outlined'
                disabled={!isEdited}
                color='success'
                size='small'
                onClick={handleSubmitSettings}
            >
                {formatLang(userLangID, "Uložit", "Save")}
            </Button>

        </Box>

        <Box>
            <Box display="flex" alignItems="center" gap={2} mb={2}>  
                <Typography>{formatLang(userLangID, "Nové registrace", "New registrations")}:</Typography>
                <Typography>{appSettings.allowRegistration ? "ON" : "OFF"}</Typography>
                <Button
                    variant='outlined'
                    size='small'
                    onClick={() => {
                        setAppSettings(prev => ({...prev, allowRegistration: !prev.allowRegistration}))
                        setIsEdited(true)
                    }}
                >
                    Toggle
                </Button>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>  
                <Typography>{formatLang(userLangID, "Údržbový režim", "Maintenance mode")}:</Typography>
                <Typography>{appSettings.isMaintenance ? "ON" : "OFF"}</Typography>
                <Button
                    variant='outlined'
                    size='small'
                    onClick={() => {
                        setAppSettings(prev => ({...prev, isMaintenance: !prev.isMaintenance}))
                        setIsEdited(true)
                    }}
                >
                    Toggle
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default AdminDashboard