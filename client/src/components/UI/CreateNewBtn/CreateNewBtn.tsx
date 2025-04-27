import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";
import { useUserContext } from "../../../context/UserContext";
import { useState } from "react";
import { CATEGORY_ID_TRANSACTION, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS, USE_CASE_CREATE } from "../../../config/globals";
import { IconAdd, IconCard, IconCategory, IconMoney, IconPiggyBank } from "../../../utils/icons/icons";
import { formatLang } from "../../../utils/functions/formatLang";
import NewTransModalMUI from "../../Modals/NewTransModal/NewTransModalMUI"
import NewCategoryModal from "../../Modals/NewCategoryModal/NewCategoryModal"
import { useNavigate } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400 },
  p: 4,
}

const CreateNewBtn = () => {
    const { userLangID } = useUserContext();
  
    const [isOpen, setIsOpen] = useState(false);
    const [showModalTrans, setShowModalTrans] = useState(false);
    const [showModalCat, setShowModalCat] = useState(false);
    const [showModalGoal, setShowModalGoal] = useState(false);
    const [pageID, setPageID] = useState("");

    const navigate = useNavigate()
  
    const toggleMenu = () => setIsOpen(!isOpen)
    const toggleModalTrans = () => setShowModalTrans(!showModalTrans)
    const toggleModalCat = () => setShowModalCat(!showModalCat)
    const toggleModalGoal = () => setShowModalGoal(!showModalGoal)
  
    const openModalNewExpense = () => {
      setPageID(PAGE_ID_TRANSACTIONS)
      toggleModalTrans()
      toggleMenu()
    }
  
    const openModalNewIncome = () => {
      setPageID(PAGE_ID_INCOME)
      toggleModalTrans()
      toggleMenu()
    }

    const handleBudgetClick = () => {
        toggleMenu()
        navigate("/dashboard/planner")
    }
  
    return (
      <>
        {/* MODÁLNÍ OKNA  */}
        <NewTransModalMUI
            handleHide={toggleModalTrans}
            pageID={pageID}
            isOpen={showModalTrans}
        />

        { showModalCat && (
            <NewCategoryModal
            categoryType={CATEGORY_ID_TRANSACTION}
            toggleModal={toggleModalCat}
            useCase={USE_CASE_CREATE}
            selectedCategory={null}
            />
        )}


        <Tooltip title={formatLang(userLangID, "Nový...", "New...")}>
          <IconButton
            color="primary"
            size="large"
            children={<IconAdd />}
            onClick={toggleMenu}
          />
        </Tooltip>
  
        <Modal open={isOpen} onClose={toggleMenu} sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>

          <Box sx={style}>

            <Button variant="contained" size="medium" fullWidth sx={{ height: "60px", fontSize: "1rem", mb: 6 }} startIcon={<IconCard />}
                onClick={openModalNewExpense}
            >
                {formatLang(userLangID, "Transakce", "Transaction")}
            </Button>

            <Button variant="contained" size="medium" fullWidth sx={{ height: "60px", fontSize: "1rem", mb: 6 }} startIcon={<IconMoney />}
                onClick={openModalNewIncome}
            >
                {formatLang(userLangID, "Příjem", "Income")}
            </Button>

            <Button variant="contained" size="medium" fullWidth sx={{ height: "60px", fontSize: "1rem", mb: 6 }} startIcon={<IconCategory />}
                onClick={() => {
                    toggleModalCat()
                    toggleMenu()
                }}
            >
                {formatLang(userLangID, "Kategorie", "Category")}
            </Button>

            <Button variant="contained" size="medium" fullWidth sx={{ height: "60px", fontSize: "1rem" }} startIcon={<IconPiggyBank />}
                onClick={handleBudgetClick}
            >
                {formatLang(userLangID, "Rozpočet", "Budget")}
            </Button>
            
          </Box>

        </Modal>
      </>
    );
  };
  
  export default CreateNewBtn;
  
