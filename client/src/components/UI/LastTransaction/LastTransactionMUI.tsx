import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH, TODAY_TRANSACTION } from "../../../config/globals"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import { formatDistanceToNow } from "date-fns"
import { cs } from "date-fns/locale"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { categoryIcons } from "../../../utils/icons/category-icons"

interface LastTransactionProps {
  iconID: number;
  name: string;
  date: Date;
  amount: number;
  type: string;
}

const LastTransactionMUI = ({ iconID, name, date, amount, type }: LastTransactionProps) => {

    const { userCurrency, userLangID } = useUserContext()

    const dateObj = new Date(date)
    const timestamp = dateObj.getTime()

  return (
    <ListItem
        sx={{ borderBottom: "1px solid", mb: 1, borderColor: "primary.dark" }}
    >

      <ListItemText
        primary={
          type === CATEGORY_ID_TRANSACTION
            ? formatLang(userLangID, "Poslední transakce", "Last transaction")
            : type === CATEGORY_ID_INCOME
            ? formatLang(userLangID, "Poslední příjem", "Last income")
            : type === TODAY_TRANSACTION
            ? formatLang(userLangID, "Dnešní transakce", "Today's transaction")
            : ""
        }
        secondary={
            <Box display="flex" alignItems="center" gap={1}>
                {categoryIcons.find(x => x.id === iconID)?.iconJSX} 
                <Typography fontSize={12}>{name}</Typography>
            </Box>
        }
      />
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="body2" color="textSecondary" fontSize={12}>
            {formatDistanceToNow(timestamp, { addSuffix: true, locale: userLangID === LANG_CZECH ? cs : undefined })}
        </Typography>

        <Typography variant="body2" color={type === CATEGORY_ID_INCOME ? "success" : "error"} fontWeight={600}>
            { type === CATEGORY_ID_TRANSACTION && "-" }
            {formatCurrency(amount, userCurrency)}
        </Typography>

      </Box>
    </ListItem>
  );
};

export default LastTransactionMUI;
