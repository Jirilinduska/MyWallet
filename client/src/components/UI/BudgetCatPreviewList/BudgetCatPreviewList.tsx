import { formatCurrency } from "../../../utils/functions/formatNumber"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IconDelete, IconEdit, IconSave } from "../../../utils/icons/icons"
import { IGetBudgetCategories } from "../../../utils/interfaces/interfaces"
import Input from "../Input/Input"

interface BudgetCatPreviewListProps {
    budgetCategories: IGetBudgetCategories[]
    wantEdit: string
    categoryWantDelete: string
    userCurrency: string
    toggleWantDeleteCat: () => void
    setCategoryWantDelete: (id: string) => void
    handlePriceChange: (id: string, price: string) => void
    setWantEdit: (id: string) => void
    handleUpdatePlan: () => void
    isFinished: boolean
}

const BudgetCatPreviewList = ({ 

    budgetCategories, wantEdit, categoryWantDelete, userCurrency, toggleWantDeleteCat, 
    setCategoryWantDelete , handlePriceChange, setWantEdit, handleUpdatePlan, isFinished

} : BudgetCatPreviewListProps) => {

  return (
    <div className="h-[40vh] overflow-y-auto p-2">
        { budgetCategories.length > 0 && budgetCategories.map((x) => {
    
            const iconObject = x?.category?.iconID ? categoryIcons.find((icon) => icon.id === x.category.iconID) : null
            const iconJSX = iconObject ? iconObject.iconJSX : null

            return (
                <div
                    key={x.category._id}
                    className={`
                        ${wantEdit === x.category._id ? "ring-2 ring-green-500" : ""}
                        ${categoryWantDelete === x.category._id && "ring-2 ring-red-500"}
                        flex items-center justify-between gap-4 p-4 rounded-md mb-2 bg-white shadow hover:shadow-lg hover:bg-gray-100`}
                >
                
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm sm:text-xl lg:text-2xl text-colorBlue">{iconJSX || null}</span>
                        <p className="text-xs sm:text-base xl:text-lg font-medium">{x.category.name}</p>
                    </div>

                    <div className="flex items-center gap-4">
                    
                        { wantEdit !== x.category._id && (
                            <>
                                <span className="">{formatCurrency(x.price, userCurrency)}</span> 

                                { !isFinished && <IconEdit className="icon text-colorBlue" onClick={ () =>  setWantEdit(x.category._id) } />}

                                { !isFinished &&                                 
                                    <IconDelete className="icon text-red-500" onClick={ () => { 
                                        toggleWantDeleteCat()
                                        setCategoryWantDelete(x.category._id)
                                    }}/> 
                                }
                            </>
                        )}

                        { wantEdit === x.category._id  && (
                            <>
      
                                <Input
                                    inputName="price"
                                    inputType="text"
                                    labelFor="price"
                                    labelValue=""
                                    onChange={(e) => handlePriceChange(x.category._id, e.target.value)}
                                    placeholder={`0 ${userCurrency}`}
                                     value={(budgetCategories.find((x) => x.category._id === wantEdit)?.price)?.toString() || ""}
                                />

                                <IconSave className={`${ wantEdit === x.category._id && "animate-pulse" } icon text-green-500`} onClick={ () => {
                                    setWantEdit("")
                                    handleUpdatePlan()
                                }}/>

                            </>
                        )}

                    </div>

                </div>
            )
        })}
    </div>
  )
}

export default BudgetCatPreviewList