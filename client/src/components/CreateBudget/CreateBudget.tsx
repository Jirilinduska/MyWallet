import { useEffect, useState } from "react"
import { useCategoriesContext } from "../../context/CategoriesContext"
import { ICategory, INewBudget } from "../../utils/interfaces/interfaces"
import { categoryIcons } from "../../utils/icons/category-icons"
import Input from "../UI/Input/Input"
import { IconClose } from "../../utils/icons/icons"
import { useUserContext } from "../../context/UserContext"

interface CrateBudgetProps {
    newBudget: INewBudget
    setNewBudget: React.Dispatch<React.SetStateAction<INewBudget>>
}

const CreateBudget = ({ newBudget, setNewBudget } : CrateBudgetProps) => {

    const { categoriesTransactions, refreshCategories } = useCategoriesContext()
    const { refreshUserData, userLangID, userCurrency } = useUserContext()

    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        if(!categoriesTransactions) refreshCategories()
        setCategories(categoriesTransactions)
    }, [categoriesTransactions])

    useEffect(() => {
        if(!userCurrency) refreshUserData()
    }, [userCurrency])

    const isCategoryInArray = (categoryID: string): boolean => {
        return newBudget.budgetCategories.findIndex(category => category.categoryID === categoryID) !== -1
    }

    const removeCategoryFromArray = (categoryID: string) => {
        const updatedCategories = newBudget.budgetCategories.filter((category) => category.categoryID !==categoryID)
        setNewBudget({ ...newBudget, budgetCategories: updatedCategories })
    } 

    const handlePriceChange = (categoryID: string, price: string) => {
        const updatedCategories = [...newBudget.budgetCategories]
        const categoryIndex = updatedCategories.findIndex(category => category.categoryID === categoryID)
    
        if (categoryIndex === -1) {
            updatedCategories.push({
                categoryID,
                price: price
            });
        } else {
            updatedCategories[categoryIndex] = { ...updatedCategories[categoryIndex], price }
        }
    
        setNewBudget({ ...newBudget, budgetCategories: updatedCategories })
    }

  return (
    <div className="my-10 h-[50vh] overflow-y-auto">

        <div className="p-2">
            {categories.length && categories.map((x) => {

                const iconObject = categoryIcons.find( (icon) => icon.id === x.iconID)
                const iconJSX = iconObject ? iconObject.iconJSX : null

                return (
                    <div
                        key={x._id}
                        className={`${ isCategoryInArray(x._id) ? "ring-green-500 ring-2" : "ring-0" } flex items-center justify-between gap-4 p-4 rounded-md mb-2 bg-white shadow hover:shadow-lg hover:bg-gray-100`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm sm:text-xl lg:text-2xl text-colorBlue">{iconJSX}</span>
                            <p className="text-xs sm:text-base xl:text-lg font-medium">{x.name}</p>
                        </div>

                        <div className="flex items-center gap-2">

                            <Input
                                inputName="price"
                                inputType="text"
                                labelFor="price"
                                labelValue=""
                                onChange={(e) => handlePriceChange(x._id, e.target.value)}
                                placeholder={`0 ${userCurrency}`}
                                value={newBudget.budgetCategories.find((item) => item.categoryID === x._id)?.price || ''}
                            />

                            <div className="">
                                { isCategoryInArray(x._id) ? <IconClose className="icon text-red-500" onClick={ () => removeCategoryFromArray(x._id) }/> : null }
                            </div>

                        </div>

                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default CreateBudget