import { Box, Button, Typography } from '@mui/material'

const MaintenancePage = () => {
  return (
    <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        height="100vh"
    >
        <Typography mb={6} fontWeight={600} variant='h3'>
            Maintenance in progress
        </Typography>
        <Typography variant='body1' mb={6}>
            The app is currently under maintenance, we will be back shortly!
        </Typography>

        <Button
            variant='contained'
            onClick={() => window.location.reload()}
        >
            Refresh page
        </Button>
    </Box>
  )
}

export default MaintenancePage