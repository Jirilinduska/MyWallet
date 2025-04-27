import { Box, IconButton, Typography } from "@mui/material"
import { IconNext, IconPrev } from "../../../utils/icons/icons"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useUserContext } from "../../../context/UserContext"

interface MonthNavigatorProps {
    year: number,
    month: number
    handlePrev: () => void, 
    handleNext: () => void,
    loading: boolean
}


const MonthNavigator = ({ handleNext, handlePrev, loading, month, year } : MonthNavigatorProps ) => {

    const thisMonth = new Date().getMonth() + 1
    const thisYear = new Date().getFullYear()

    const isThisMonth = thisMonth === month && thisYear === year

    const { userLangID } = useUserContext()

    return(
        <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            gap={2} 
            mb={4}
        >

        <IconButton 
                onClick={handlePrev} 
                loading={loading}
                color="primary"
                sx={{
                border: '1px solid #ccc',
                    borderRadius: '12px',
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f5f5f5' }
                }}
            >
            <IconPrev />
        </IconButton>

        <Typography 
            variant="h5" 
            fontWeight={600}
            sx={{ minWidth: '80px', textAlign: 'center' }}
        >
            {`${getMonthName(year, month, userLangID)} (${year})`}
        </Typography>
        
        <IconButton 
            onClick={handleNext} 
            disabled={isThisMonth}
            loading={loading}
            color="primary"
            sx={{
                border: '1px solid #ccc',
                borderRadius: '12px',
                bgcolor: isThisMonth ? '#f0f0f0' : 'white',
                '&:hover': {
                    bgcolor: isThisMonth ? '#f0f0f0' : '#f5f5f5'
            }
            }}
        >
            <IconNext />
        </IconButton>
        
    </Box>
    )
}


export default MonthNavigator