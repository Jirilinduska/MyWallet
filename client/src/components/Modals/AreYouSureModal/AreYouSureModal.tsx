import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    IconButton,
    DialogContent
  } from "@mui/material"
  import CloseIcon from "@mui/icons-material/Close"
  
  interface AreYouSureModalProps {
    handleYes: () => void
    handleNo: () => void
    titleValue: string
    buttonYesValue: string
    buttonNoValue: string
  }
  
  const AreYouSureModal = ({
    handleNo,
    handleYes,
    titleValue,
    buttonNoValue,
    buttonYesValue
  }: AreYouSureModalProps) => {
    return (
      <Dialog
        open
        onClose={handleNo}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { bgcolor: "background.paper", borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {titleValue}
          <IconButton onClick={handleNo}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent sx={{ py: 4 }} />
  
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
          <Button variant="contained" color="error" onClick={handleYes}>
            {buttonYesValue}
          </Button>
          <Button variant="outlined" color="primary" onClick={handleNo}>
            {buttonNoValue}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default AreYouSureModal
  