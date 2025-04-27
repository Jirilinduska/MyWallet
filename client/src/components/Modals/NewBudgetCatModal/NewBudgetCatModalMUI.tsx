import { Box, Button, IconButton, Modal, Tooltip, Typography } from "@mui/material"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useEffect, useState } from "react"
import { BudgetCategories2 } from "../../UI/OneBudgetPreview/OneBudgetPreview"
import { ICategory } from "../../../utils/interfaces/interfaces"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IconAdd } from "../../../utils/icons/icons"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 300, sm: 500 },
    boxShadow: 24,
    p: 4,
}

interface NewBudgetCatModalMUIProps {
    isOpen: boolean
    handleClose: () => void
    budgetCategories: BudgetCategories2[]
    addCategory: (catID: string) => void
}

const NewBudgetCatModalMUI = ({ isOpen, handleClose, budgetCategories, addCategory } : NewBudgetCatModalMUIProps ) => {

    const { userLangID } = useUserContext()
    const { categoriesTransactions } = useCategoriesContext()

    const [categories, setCategories] = useState<ICategory[] | null>(null)

    useEffect(() => {
        const getCategories = categoriesTransactions.filter(
            (transactionCategory) => !budgetCategories.some( (budgetCategory) => budgetCategory.categoryID._id === transactionCategory._id)
        )

        setCategories(getCategories)
    }, [isOpen, categoriesTransactions, budgetCategories] )


  return (
    <Modal open={isOpen} onClose={handleClose}>

        <Box sx={{ ...style, bgcolor: "white" }}>

            <Typography variant="h6" fontWeight={600} mb={4} color="text.primary">
                {formatLang(userLangID, "Přidat kategorii do rozpočtu", "Add category to budget")}
            </Typography>

            <div className="p-4 h-[70vh] md:h-[60vh] lg:h-[50vh] overflow-y-auto">

                {/* // Pokud jsou všechny kategorie již použity. */}
                { categories && categories.length === 0 && (
                    <div className="flex items-center justify-center gap-4 flex-col h-full">
                    
                        <Typography>
                            {formatLang(userLangID, "Všechny vaše kategorie jsou již součástí rozpočtu", "All your categories are already part of the budget")}
                        </Typography>

                        <Button
                            href="/dashboard/categories"
                            variant="contained"
                        >
                            {formatLang(userLangID, "Vytvořit novou kategorii", "Create new category")}
                        </Button>

                    </div>
                )}

                {/* // Kategorie, které uživatel ještě nepřidal do tohoto budgetu. */}
                { categories && categories.length > 0 && categories.map((x) => {

                    const iconJSX = categoryIcons.find( (icon) => icon.id === x.iconID )?.iconJSX || null

                    return (
                        <Box key={x._id} bgcolor="background.paper" mb={1} display="flex" p={1} alignItems="center" justifyContent="space-between" borderRadius="20px">
                           
                            <Box display="flex" alignItems="center" gap={2}>
                                <span className="text-colorMain">{iconJSX}</span>
                                <span className="text-sm font-semibold">{x.name}</span>
                            </Box>
                            <Tooltip title={formatLang(userLangID, "Přidat", "Add")}>
                                <IconButton 
                                    color="primary"
                                    onClick={() => addCategory(x._id)}
                                >
                                    <IconAdd/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )
                })}

            </div>

            <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={handleClose}
            >
                {formatLang(userLangID, "Zavřít", "Close")}
            </Button>
  
        </Box>
    </Modal>
  )
}

export default NewBudgetCatModalMUI