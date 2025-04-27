import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { ITransaction } from "../../../utils/interfaces/interfaces"
import { ChangeEvent, useState } from "react"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { handleUpdateTransaction } from "../../../API/Transactions"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { handleError } from "../../../Errors/handleError"
import { formatLang } from "../../../utils/functions/formatLang"
import SelectCategory from "../../UI/SelectCategory/SelectCategory"
import DatePickerElement from "../../UI/DatePicker/DatePickerElement"
import { useRefetchContext } from "../../../context/RefetchContext"

interface EditTransModalProsp {
    toggleEditModal: () => void
    transaction: ITransaction
    pageID: string | null
    isOpen: boolean
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 300, sm: 500 },
    boxShadow: 24,
    p: 4,
}

const EditTransModalMUI = ({ toggleEditModal, transaction, pageID, isOpen } : EditTransModalProsp ) => {

    const { userLangID } = useUserContext()
    const { deleteTransaction } = useTransactionsContext()
    const { triggerOverviewDataRefetch } = useRefetchContext()

    const [isEdited, setIsEdited] = useState(false)
    const [wantDelete, setWantDelete] = useState(false)

    const [transData, setTransData] = useState({ 
      id: transaction._id,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      day: transaction.day,
      month: transaction.month,
      year: transaction.year
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setTransData( (prev) => ({
        ...prev,
        [name]: name === "amount" ? Number(value) : value
      }))
      setIsEdited(true)
    }

    const handleSetDate = (newDate: Date | null) => {
      if (newDate) {
          setTransData((prev) => ({
              ...prev,
              year: newDate.getFullYear(),
              month: newDate.getMonth() + 1,
              day: newDate.getDate()
          }))
          setIsEdited(true)
      }
    }

    const handleUpdateTrans = async() => {
      try {
        await handleUpdateTransaction(transData)
        triggerOverviewDataRefetch()
        handleNotification(NOTIF_SUCCESS, userLangID, "Úspěšně aktualizováno", "Updated successfully")
      } catch (error) {
        handleError(error, userLangID)
      }
    }


  return (
    <Modal open={isOpen} onClose={toggleEditModal}>

      <Box sx={{ ...style, bgcolor: "white" }}>

        <Typography variant="h6" fontWeight={600} mb={4} color="text.primary">
            { pageID === PAGE_ID_TRANSACTIONS && formatLang(userLangID, "Upravit výdaj", "Edit transaction") }
            { pageID === PAGE_ID_INCOME && formatLang(userLangID, "Upravit příjem", "Edit income") }
        </Typography>

        <Box mb={4}>
            <TextField
                label={formatLang(userLangID, "Název", "Title")}
                value={transData.title}
                onChange={(e) => setTransData((prev) => ({...prev, title: e.target.value}))}
                fullWidth
            />
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2}>

            <TextField
                label={formatLang(userLangID, "Částka*", "Amount*")}
                value={transData.amount}
                onChange={(e) => setTransData((prev) => ({...prev, amount: Number(e.target.value)}))}
            />

            <SelectCategory
              handleChange={handleChange}
              value={transData.category}
              categoryType={`${pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : CATEGORY_ID_INCOME}`}
            />

        </Box>

        <div className="pb-6 md:pb:20">
            <DatePickerElement
              dateValues={{ day: transData.day.toString(), month: transData.month.toString(), year: transData.year.toString() }}
              handleSetDate={handleSetDate}
            />
        </div>

                    
        { !wantDelete && (
              <>
                <Button
                    onClick={() => setWantDelete(true)}
                    color="error"
                    variant="contained"
                    sx={{ mr: 4 }}
                >
                    {formatLang(userLangID, "Odstranit", "Delete")}
                </Button>

                <Button
                    variant="contained"
                    disabled={!isEdited}
                    onClick={() => {
                        handleUpdateTrans()
                        toggleEditModal()
                    }}
                >
                    {formatLang(userLangID, "Uložit", "Save")}
                </Button>

              </>
            )}

            { wantDelete && (
              <div className="mx-auto">

                <h3 className="font-semibold mb-6">{formatLang(userLangID, "Opravdu chcete odstranit tuto transakci?", "Do you really want to delete this transaction?")}</h3>

                <div className="flex items-center gap-2">



                    <Button
                        variant="contained"
                        onClick={ () => { pageID &&
                            deleteTransaction(transaction._id, userLangID, pageID)
                            triggerOverviewDataRefetch()
                            toggleEditModal()
                            setWantDelete(false)
                          }}
                        color="error"
                    >
                        {formatLang(userLangID, "Ano", "Yes")}
                    </Button>

                    <Button
                        variant="contained"
                        onClick={ () => setWantDelete(false) }
                        color="primary"
                    >
                        {formatLang(userLangID, "Zrušit", "Close")}
                    </Button>


                </div>

              </div>
            )}
        
      </Box>
    </Modal>
  );
};

export default EditTransModalMUI;
