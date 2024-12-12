import { useEffect, useState } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { IconAdd, IconClose } from "../../../../utils/icons/icons"
import { formatLang } from "../../../../utils/functions/formatLang"
import { ICategory, IGetBudgetCategories } from "../../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../../context/CategoriesContext"
import { categoryIcons } from "../../../../utils/icons/category-icons"
import Button from "../../Button/Button"

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

            <div className="relative rounded-lg shadow bg-gray-700">

                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white">{formatLang(userLangID, "Přidat kategorii", "Add category")}</h3>
                    <IconClose onClick={toggleWantNewCat} className="icon"/>
                </div>

                <div className="p-4">
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

                    <Button buttonValue={formatLang(userLangID, "Zavřít", "Close")} className='button-blue w-1/2 mx-auto block mt-6' handleClick={toggleWantNewCat}/>

                </div>

            </div>

        </div>

    </div>
  )
}

export default NewBudgetCatModal