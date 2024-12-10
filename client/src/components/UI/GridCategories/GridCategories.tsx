import { useState } from "react"
import { LANG_CZECH, USE_CASE_EDIT, USE_CASE_CREATE } from "../../../config/globals"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IconAdd } from "../../../utils/icons/icons"
import { ICategory } from "../../../utils/interfaces/interfaces"
import NewCategoryModal from "../Modals/NewCategoryModal/NewCategoryModal"

export interface IGridCategories {
    categories: ICategory[]
    langID: string
    titleEN: string
    titleCS: string
    categoryType: string
    handleSetNotif: (key: "err" | "succ", msg: string) => void
}

const GridCategories: React.FC<IGridCategories> = ({ categories, langID, titleEN, titleCS, categoryType, handleSetNotif }) => {

    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const toggleModalCreate = () => setShowModalCreate(!showModalCreate)
    const toggleModalEdit = () => setShowModalEdit(!showModalEdit)
    const [selectedCategory, setSelectedCategory] = useState<ICategory>()

    // TODO - Opravit chybu při mazání kategorii (podle _id)!
    const handleOpenEditModal = (x: ICategory) => {
        setShowModalEdit(true)
        setSelectedCategory(x)
    } 

  return (
    <div className="w-[90%] sm:w-3/4 mx-auto mb-10">

        {/* // Modal window - create new category */}
        { showModalCreate && (
            <NewCategoryModal
                categoryType={categoryType}
                toggleModal={toggleModalCreate}
                useCase={USE_CASE_CREATE}
                selectedCategory={null}
                handleSetNotif={handleSetNotif}
            />
        )}

        {/* // Modal window - edit category */}
        { showModalEdit && selectedCategory && (
            <NewCategoryModal
                categoryType={categoryType}
                toggleModal={toggleModalEdit}
                useCase={USE_CASE_EDIT}
                selectedCategory={selectedCategory}
                handleSetNotif={handleSetNotif}
            />
        )}

        <div className="mb-6 flex items-center gap-4">
            <h3 className="font-semibold">{langID === LANG_CZECH ? titleCS : titleEN}</h3>
            <IconAdd className="icon text-2xl" onClick={toggleModalCreate}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((x) => {
            
                const iconObject = categoryIcons.find( (icon) => icon.id === x.iconID)
                const iconJSX = iconObject ? iconObject.iconJSX : null

                // TODO - Přidat tlačítka na edit/delete categorie.
                return (
                    <div
                        key={x._id}
                        onClick={ () => handleOpenEditModal(x)}
                        className="flex items-center gap-4 p-4 rounded-md cursor-pointer bg-white shadow hover:shadow-lg hover:bg-gray-100"
                    >
                        <span className="text-sm sm:text-xl lg:text-2xl text-colorBlue">{iconJSX}</span>
                        <p className="text-xs sm:text-base xl:text-lg font-medium">{x.name}</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default GridCategories