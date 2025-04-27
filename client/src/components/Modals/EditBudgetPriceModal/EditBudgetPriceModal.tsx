import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import { useState } from "react"


interface EditBudgetPriceModalProps {
    isOpen: boolean
    handleClose: () => void
    value: number
    handleChangePrice: (value: number, categoryID: string) => void
    catID: string
    loading: boolean
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

const EditBudgetPriceModal = ({ isOpen, handleClose, value, catID, handleChangePrice, loading } : EditBudgetPriceModalProps) => {

    const { userLangID, userCurrency } = useUserContext()

    const [price, setPrice] = useState(value)
    const [isEdit, setIsEdit] = useState(false)

  return (
    <Modal open={isOpen} onClose={handleClose}>

        <Box sx={{ ...style, bgcolor: "white" }}>

            <Typography variant="h6" fontWeight={600} mb={4} color="text.primary">
                {formatLang(userLangID, "Změnit částku", "Change amount")}
            </Typography>

        <Box mb={4}>
            <TextField
                label={formatLang(userLangID, `Částka (${userCurrency})`, `Amount (${userCurrency})`)}
                value={price}
                onChange={(e) => {
                    setPrice(Number(e.target.value))
                    setIsEdit(true)
                }}
                fullWidth
            />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
            <Button
                variant="contained"
                fullWidth
                color="success"
                disabled={!isEdit}
                loading={loading}
                onClick={() => handleChangePrice(price, catID)}
            >
                {formatLang(userLangID, "Uložit", "Save")}
            </Button>

            <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={handleClose}
                loading={loading}
            >
                {formatLang(userLangID, "Zrušit", "Cancel")}
            </Button>
        </Box>
      
    </Box>
  </Modal>
  )
}

export default EditBudgetPriceModal