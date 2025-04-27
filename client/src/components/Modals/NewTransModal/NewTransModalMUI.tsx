import { Box, Modal, Typography } from "@mui/material"
import { useUserContext } from "../../../context/UserContext";
import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { formatLang } from "../../../utils/functions/formatLang"
import NewTransForm from "../../Forms/NewTransForm/NewTransForm"
import { useState } from "react"

interface NewTransModalProps {
  handleHide: () => void;
  pageID: string | undefined;
  isOpen: boolean;
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

const NewTransModalMUI = ({ handleHide, pageID, isOpen }: NewTransModalProps) => {

  const { userLangID } = useUserContext()

  return (
    <Modal
      open={isOpen}
      onClose={handleHide}
    >
      <Box sx={{...style, bgcolor: "white"}}>
           
            <Typography variant="h6" fontWeight={600}>
                { pageID === PAGE_ID_TRANSACTIONS && formatLang(userLangID, "Nový výdaj", "New Transaction") }
                { pageID === PAGE_ID_INCOME && formatLang(userLangID, "Nový příjem", "New income") }
            </Typography>

            <NewTransForm 
              handleHide={handleHide}
              pageID={pageID}
            />
      </Box>
    </Modal>
  );
};

export default NewTransModalMUI;
