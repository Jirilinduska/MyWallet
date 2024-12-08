import { useState } from "react"
import { LANG_CZECH } from "../../../config/globals"
import { categoryIcons } from "../../../utils/data/category-icons"
import { IconAdd } from "../../../utils/icons/icons"
import { ICategory } from "../../../utils/interfaces/interfaces"
import NewCategoryModal from "../Modals/NewCategoryModal/NewCategoryModal"

export interface IGridCategories {
    categories: ICategory[]
    langID: string
    titleEN: string
    titleCS: string
    categoryType: string
}

const GridCategories: React.FC<IGridCategories> = ({ categories, langID, titleEN, titleCS, categoryType }) => {

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => setShowModal(!showModal)


  return (
    <div className="w-[90%] sm:w-3/4 mx-auto mb-10">

        {/* // Modal window - create new category */}
        { showModal && (
            <NewCategoryModal
                categoryType={categoryType}
                toggleModal={toggleModal}
            />
        )}

        <div className="mb-6 flex items-center gap-4">
            <h3 className="font-semibold">{langID === LANG_CZECH ? titleCS : titleEN}</h3>
            <IconAdd className="icon text-2xl" onClick={toggleModal}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((x) => {
            
                const iconObject = categoryIcons.find( (icon) => icon.id === x.iconID)
                const iconJSX = iconObject ? iconObject.iconJSX : null

                // TODO - Přidat tlačítka na edit/delete categorie.
                return (
                    <div
                        key={x._id}
                        className="flex items-center gap-4 p-4 rounded-md bg-white shadow hover:shadow-lg hover:bg-gray-100"
                    >
                        <span className="text-sm sm:text-xl lg:text-2xl text-colorBlue">{iconJSX}</span>
                        <p className="text-xs sm:text-base lg:text-lg font-medium">{x.name}</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default GridCategories