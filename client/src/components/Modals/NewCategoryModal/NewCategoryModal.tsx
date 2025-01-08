import { useEffect } from "react"
import { LANG_CZECH, USE_CASE_CREATE, USE_CASE_EDIT } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { IconClose } from "../../../utils/icons/icons"
import NewCategoryForm from "../../Forms/NewCategoryForm/NewCategoryForm"
import { ICategory } from "../../../utils/interfaces/interfaces"

export interface NewCategoryModalProps {
    categoryType: string
    toggleModal: () => void
    useCase: string
    selectedCategory: ICategory | null
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({ categoryType, toggleModal, useCase, selectedCategory }) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [] )

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">
        
            <div className="relative rounded-lg shadow bg-gray-700">

                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">

                    <h3 className="text-lg font-semibold text-white">
                        { useCase === USE_CASE_CREATE && (userLangID === LANG_CZECH ? "Nová kategorie" : "New category") }
                        { useCase === USE_CASE_EDIT && (userLangID === LANG_CZECH ? "Upravit kategorii" : "Edit category") }
                    </h3>

                    <IconClose onClick={toggleModal} className="icon"/>

                </div>

                <NewCategoryForm categoryType={categoryType} langID={userLangID} useCase={useCase} selectedCategory={selectedCategory} toggleModal={toggleModal}/>   

            </div>
        </div>
    </div>
  )
}

export default NewCategoryModal