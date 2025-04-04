import { Box, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material"
import React from "react";
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { useUserContext } from "../../../context/UserContext"

interface InfoItemMUIProps {
    title: string
    amount: number
    color: "error" | "info" | "success" | "primary"
    icon?: React.ReactElement
    formatToCurrency: boolean
}

const InfoItemMUI = ({ title, amount, color, icon, formatToCurrency } : InfoItemMUIProps ) => {

    const { userCurrency } = useUserContext()

  return (
    <Card sx={{ minWidth: { xs: 150, md: 225 }, bgcolor: "background.paper" }}>

      <CardContent>

        {icon && <Box mb={2} fontSize={20}>{icon}</Box>}
        
        <Typography variant="h5" component="h6" fontWeight={600} mb={2} color={color}>
          {formatToCurrency ? formatCurrency(amount, userCurrency) : amount}
        </Typography>

        <Typography color="text.primary">
            {title}
        </Typography>

      </CardContent>

    </Card>
  );
};

export default InfoItemMUI;
