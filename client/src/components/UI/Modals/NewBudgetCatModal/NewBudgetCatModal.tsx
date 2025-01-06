import { useEffect, useState } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { IconAdd, IconClose } from "../../../../utils/icons/icons"
import { formatLang } from "../../../../utils/functions/formatLang"
import { ICategory, IGetBudgetCategories } from "../../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../../context/CategoriesContext"
import { categoryIcons } from "../../../../utils/icons/category-icons"
import { Link } from "react-router-dom"
import Button from "../../../../better_components/UI/Button/Button"
import { COLOR_BLUE } from "../../../../config/globals"

interface NewBudgetCatModalProps {
    toggleWantNewCat: () => void
    budgetCategories: IGetBudgetCategories[]
    handleAddCatClick: (cat: ICategory) => void
} 

const NewBudgetCatModal = ({ toggleWantNewCat, budgetCategories, handleAddCatClick} : NewBudgetCatModalProps ) => {

    const { refreshUserData, userLangID } = useUserContext()
    const { categoriesTransactions, refreshCategories } = useCategoriesContext()

    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        if(!userLangID) refreshUserData()
        if(!categoriesTransactions) refreshCategories()
    }, [userLangID, categoriesTransactions] )

    useEffect(() => {
        const getCategories = categoriesTransactions.filter(
            (transactionCategory) => !budgetCategories.some( (budgetCategory) => budgetCategory.category._id === transactionCategory._id)
        )
        setCategories(getCategories)
    }, [categoriesTransactions, budgetCategories] )

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative rounded-lg shadow bg-gray-700 pb-4">

                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white">{formatLang(userLangID, "Přidat kategorii", "Add category")}</h3>
                    <IconClose onClick={toggleWantNewCat} className="icon"/>
                </div>

                <div className="p-4 h-[70vh] md:h-[60vh] lg:h-[50vh] overflow-y-auto">

                    {/* // Pokud jsou všechny kategorie již použity. */}
                    { categories.length === 0 && (
                        <div className="flex items-center justify-center gap-4 flex-col h-full">
                            <p className="text-white">{formatLang(userLangID, "Všechny vaše kategorie jsou již součástí rozpočtu", "All your categories are already part of the budget")}</p>
                            <Link 
                                to="/dashboard/categories"
                                className="button-blue"
                            >
                                {formatLang(userLangID, "Vytvořit novou kategorii", "Create new category")}
                            </Link>
                        </div>
                    )}

                    {/* // Kategori, které uživatel ještě nepřidal do tohoto budgetu. */}
                    { categories.length > 0 && categories.map((x) => {

                        const iconJSX = categoryIcons.find( (icon) => icon.id === x.iconID )?.iconJSX

                        return (
                            <div key={x._id} className="bg-white mb-4 flex items-center justify-between p-2 rounded-xl">
                
                                <div className="flex items-center gap-2">
                                    <span className="text-colorBlue">{iconJSX}</span>
                                    <span className="text-sm font-semibold">{x.name}</span>
                                </div>
                                
                                <IconAdd className="icon text-colorBlue" onClick={ () => handleAddCatClick(x) }/>
                            </div>
                        )
                    })}

                    {/* // TODO - Přidat tlačítko vytvořit novou kategorii :) */}

                </div>

                <Button
                    color={COLOR_BLUE}
                    loading={false}
                    value={formatLang(userLangID, "Zavřít", "Close")}
                    handleClick={toggleWantNewCat}
                />

            </div>

        </div>

    </div>
  )
}

export default NewBudgetCatModal