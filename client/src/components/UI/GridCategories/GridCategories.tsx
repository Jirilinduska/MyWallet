import { useState } from "react"
import { LANG_CZECH, USE_CASE_EDIT, USE_CASE_CREATE } from "../../../config/globals"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IconAdd } from "../../../utils/icons/icons"
import { ICategory } from "../../../utils/interfaces/interfaces"
import NewCategoryModal from "../Modals/NewCategoryModal/NewCategoryModal"
import { formatLang } from "../../../utils/functions/formatLang"
import ItemCategory from "../../ItemCategory/ItemCategory"

interface GridCategoriesProps {
    categories: ICategory[]
    title: string
    categoryType: string
}

const GridCategories: React.FC<GridCategoriesProps> = ({ categories, title, categoryType }) => {

    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const toggleModalCreate = () => setShowModalCreate(!showModalCreate)
    const toggleModalEdit = () => setShowModalEdit(!showModalEdit)
    const [selectedCategory, setSelectedCategory] = useState<ICategory>()

    const handleOpenEditModal = (x: ICategory) => {
        setSelectedCategory(x)
        setShowModalEdit(true)
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
            />
        )}

        {/* // Modal window - edit category */}
        { showModalEdit && selectedCategory && (
            <NewCategoryModal
                categoryType={categoryType}
                toggleModal={toggleModalEdit}
                useCase={USE_CASE_EDIT}
                selectedCategory={selectedCategory}
            />
        )}

        <div className="mb-6 flex items-center gap-4">
            <h3 className="font-semibold">{title}</h3>
            <IconAdd className="icon text-2xl" onClick={toggleModalCreate}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((x) => {
            
                const iconJSX = categoryIcons.find( (icon) => icon.id === x.iconID)?.iconJSX || null

                return (
                    <ItemCategory
                        key={x._id}
                        category={x}
                        handleOpenEditModal={handleOpenEditModal}
                        iconJSX={iconJSX}
                    />
                )
            })}
        </div>

    </div>
  )
}

export default GridCategories