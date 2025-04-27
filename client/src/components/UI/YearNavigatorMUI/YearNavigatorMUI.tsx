import { Box, IconButton, Typography } from "@mui/material"
import { IconNext, IconPrev } from "../../../utils/icons/icons"


interface YearNavigatorMUIProps {
    year: number, 
    handlePrev: () => void, 
    handleNext: () => void,
    loading: boolean
}

const YearNavigatorMUI = ({ year, handleNext, handlePrev, loading } : YearNavigatorMUIProps ) => {

    const isThisYear = new Date().getFullYear() === year

  return (
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
        {year}
      </Typography>
        
        <IconButton 
            onClick={handleNext} 
            disabled={isThisYear}
            loading={loading}
            color="primary"
            sx={{
                border: '1px solid #ccc',
                borderRadius: '12px',
                bgcolor: isThisYear ? '#f0f0f0' : 'white',
                '&:hover': {
                    bgcolor: isThisYear ? '#f0f0f0' : '#f5f5f5'
            }
            }}
        >
            <IconNext />
        </IconButton>
        
    </Box>
  )
}

export default YearNavigatorMUI