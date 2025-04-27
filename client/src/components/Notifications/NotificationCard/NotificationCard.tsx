import { Box, Button, Card, CardContent, IconButton, ListItemText, Stack, Tooltip, Typography } from "@mui/material"
import { INotification, useNotifContext } from "../../../context/NotifContext"
import { formatDistanceToNow } from "date-fns"
import { useUserContext } from "../../../context/UserContext"
import { LANG_CZECH } from "../../../config/globals"
import { cs } from "date-fns/locale"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { IconArchive, IconArchived, IconDelete } from "../../../utils/icons/icons"

interface NotificationCardProps {
    notif: INotification
}

const NotificationCard = ({ notif } : NotificationCardProps ) => {

    const { markNotifAsRead, deleteNotification, archiveNotif, unArchiveNotif} = useNotifContext()
    const { userLangID, userCurrency } = useUserContext()

    const income = notif.totalIncome ?? 0
    const spent = notif.totalSpent ?? 0
    const totalSaved = income - spent > 0 ? income - spent : 0

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        mb: 2,
        transition: "0.2s",
        borderLeft: notif.isArchived
        ? "4px solid #FFC107"
        : notif.isRead
          ? "4px solid transparent"
          : "4px solid #1976d2",
      
      backgroundColor: 
        notif.isRead
          ? "background.paper"
          : "#e3f2fd",
        "&:hover": { boxShadow: 4 },
      }}
      onClick={() => {
        if(notif.isRead) {
            return
        } else {
            markNotifAsRead(notif._id)
        }
      }}
    >
      <CardContent>
        <Stack spacing={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography 
                    variant="subtitle1" 
                    fontWeight={notif.isRead ? 600 : 700}
                    color={notif.isRead ? "text.primary" : "primary.main"} 
                >
                    {notif.titleCS}
                </Typography> 
                <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(notif.createdAt, { addSuffix: true, locale: userLangID === LANG_CZECH ? cs : undefined })}
                </Typography>
            </Box>

          <Typography variant="body2" color="text.secondary">
            {notif.messageCS}
          </Typography>

          {notif.type === "MonthlySummary" && 
          (
            <Box my={4}>
                <ListItemText 
                    sx={{ mb: 2 }}
                    primary={formatLang(userLangID, "Příjmy", "Income")} 
                    secondary={formatCurrency(notif.totalIncome || 0, userCurrency)}
                />
                <ListItemText 
                    sx={{ mb: 2 }}
                    primary={formatLang(userLangID, "Výdaje", "Expense")} 
                    secondary={`-${formatCurrency(notif.totalSpent || 0, userCurrency)}`}
                />
                <ListItemText 
                    sx={{ mb: 2 }}
                    primary={formatLang(userLangID, "Rozpočet", "Budget")} 
                    secondary={`${formatCurrency(notif.totalPlanned || 0, userCurrency)}`}
                />
                <ListItemText 
                    sx={{ mb: 2 }}
                    primary={formatLang(userLangID, "Ušetřeno", "Saved")} 
                    secondary={`${formatCurrency(totalSaved || 0, userCurrency)}`}
                />
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">

            <Box>

                <Button
                    href={`/dashboard/expense?year=${notif.year}&month=${notif.month}`}
                    target="_blank"
                    variant="outlined"
                    size="small"
                    sx={{ display: "block", width: 100, textAlign: "center", mb: 2 }}
                >
                    {formatLang(userLangID, "Výdaje", "Expenses")}
                </Button>

                <Button
                    href={`/dashboard/income?year=${notif.year}&month=${notif.month}`}
                    target="_blank"
                    variant="outlined"
                    size="small"
                    sx={{ display: "block", width: 100, textAlign: "center", mb: 2 }}
                >
                    {formatLang(userLangID, "Příjmy", "Income")}
                </Button>

            </Box>

            <Box>

                <Tooltip 
                    title={
                        formatLang(userLangID, `${notif.isArchived ? "Odarchivovat" : "Archivovat"}`, `${notif.isArchived ? "Archive" : "Unarchive"}`)
                    }>
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation()
                            notif.isArchived ? unArchiveNotif(notif._id) : archiveNotif(notif._id)
                        }}
                    >
                        {notif.isArchived ? <IconArchived /> : <IconArchive />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={notif.isArchived
                    ? formatLang(userLangID, "Odarchivujte notifikaci pro smazání", "Unarchive the notification to delete it")
                    : formatLang(userLangID, "Smazat", "Delete")
                }>
                    <IconButton 
                        color="error" 
                        disabled={notif.isArchived}
                        onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notif._id)
                        }}
                    >
                        <IconDelete />
                    </IconButton>
                </Tooltip>

            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
