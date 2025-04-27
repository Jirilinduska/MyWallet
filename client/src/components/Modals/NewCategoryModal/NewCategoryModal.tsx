import { useEffect } from "react"
import { Modal, Box, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useUserContext } from "../../../context/UserContext"
import { ICategory } from "../../../utils/interfaces/interfaces"
import { LANG_CZECH, USE_CASE_CREATE } from "../../../config/globals"
import NewCategoryForm from "../../Forms/NewCategoryForm/NewCategoryForm"

export interface NewCategoryModalProps {
  categoryType: string
  toggleModal: () => void
  useCase: string
  selectedCategory: ICategory | null
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  categoryType,
  toggleModal,
  useCase,
  selectedCategory
}) => {
  const { refreshUserData, userLangID } = useUserContext()

  useEffect(() => {
    if (!userLangID) refreshUserData()
  }, [])

  const title =
    useCase === USE_CASE_CREATE
      ? userLangID === LANG_CZECH ? "Nová kategorie" : "New category"
      : userLangID === LANG_CZECH ? "Upravit kategorii" : "Edit category"

  return (
    <Modal open onClose={toggleModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          width: "100%",
          maxWidth: 400,
          p: 3
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
            mb: 2
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <IconButton onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </Box>

        <NewCategoryForm
          categoryType={categoryType}
          langID={userLangID}
          useCase={useCase}
          selectedCategory={selectedCategory}
          toggleModal={toggleModal}
        />
      </Box>
    </Modal>
  )
}

export default NewCategoryModal
