import { ChangeEvent, useEffect, useState } from "react"
import Input from "../../UI/Input/Input"
import SelectCategoryType from "../../UI/SelectCategoryType/SelectCategoryType"
import { LANG_CZECH, LANG_ENGLISH, USE_CASE_CREATE, USE_CASE_EDIT } from "../../../config/globals"
import { categoryIcons } from "../../../utils/icons/category-icons"
import AvatarIcon from "../../UI/AvatarIcon/AvatarIcon"
import { handleDeleteCategory, handleNewCategory, handleUpdateCategory } from "../../../API/Categories"
import { ICategory } from "../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import SuccMsg from "../../Notifications/SuccMsg/SuccMsg"
import { handleSuccMsg } from "../../../utils/functions/handleSuccMsg"
import { useUserContext } from "../../../context/UserContext"
import { handleErrMsg } from "../../../utils/functions/handleErrMsg"
import ErrMsg from "../../Notifications/ErrMsg/ErrMsg"

export interface INewCategoryForm {
    categoryType: string
    langID: string
    useCase: string,
    selectedCategory: ICategory | null
    handleSetNotif: (key: "err" | "succ", msg: string) => void
    toggleModal: () => void
}

const NewCategoryForm: React.FC<INewCategoryForm> = ({ categoryType, langID, useCase, selectedCategory, handleSetNotif, toggleModal }) => {

    const { refreshCategories } = useCategoriesContext()
    const { userLangID } = useUserContext()

    const [newCategory, setNewCategory] = useState({
        id: selectedCategory?._id || "",
        name: selectedCategory?.name || "",
        iconID: selectedCategory?.iconID || 0,
        categoryType: categoryType
    })
    const [selectedIcon, setSelectedIcon] = useState(0)
    const [isEdited, setIsEdited] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSuccMsg] = useState("")
    const [wantDelete, setWantDelete] = useState(false)

    useEffect(() => {
        if(useCase === USE_CASE_EDIT) {
            setNewCategory({
                id: selectedCategory?._id || "",
                name: selectedCategory?.name || "",
                iconID: selectedCategory?.iconID || 0,
                categoryType: selectedCategory?.categoryType || ""
            })

            setSelectedIcon(selectedCategory?.iconID || 0)
        }
    }, [useCase] )

    const toggleWantDelete = () => {
        console.log(newCategory)
        setWantDelete(!wantDelete)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewCategory( (prev) => ({
            ...prev,
            [name]: name === "iconID" ? parseInt(value, 10) : value,
        }))
        setIsEdited(true)
    }

    const handleSelectIcon = (id: number) => {
        setNewCategory( (prev) => ({
            ...prev,
            iconID: id
        }))
        setSelectedIcon(id)
        setIsEdited(true)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrMsg("")
        setSuccMsg("")

        if(!newCategory.name) {
            handleErrMsg("Please fill in category name", "Prosím vyplňtne název kategorie", setErrMsg, userLangID)
            return
        }

        if(!newCategory.iconID) {
            handleErrMsg("Please select icon", "Prosím vyberte ikonku", setErrMsg, userLangID)
            return
        }

        try {
            if(useCase === USE_CASE_CREATE) {
                const response = await handleNewCategory(newCategory)
                refreshCategories()
                toggleModal()
                if(userLangID === LANG_CZECH)   handleSetNotif("succ", "Kategorie vytvořena")
                if(userLangID === LANG_ENGLISH) handleSetNotif("succ", "Category created")
            }
            if(useCase === USE_CASE_EDIT) {
                const response = await handleUpdateCategory(newCategory)
                handleSuccMsg("Category updated", "Změny uloženy", setSuccMsg, userLangID)
                refreshCategories()
            }
        } catch (error) {
            console.log(error)
            if(userLangID === LANG_CZECH)   handleSetNotif("err", "Něco se pokazilo")
            if(userLangID === LANG_ENGLISH) handleSetNotif("err", "Something went wrong")
        }
    }

    // TODO - Dokončit
    const handleDelete = async() => {

        try {
            const response = await handleDeleteCategory(newCategory.id)
            console.log(response)
            refreshCategories()
            toggleModal()
            if(userLangID === LANG_CZECH)   handleSetNotif("succ", "Kategorie odstraněna")
            if(userLangID === LANG_ENGLISH) handleSetNotif("succ", "Category deleted")
        } catch (error) {
            console.log(error)
            toggleModal()
            if(userLangID === LANG_CZECH)   handleSetNotif("err", "Něco se pokazilo")
            if(userLangID === LANG_ENGLISH) handleSetNotif("err", "Something went wrong")

        }
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-6 relative"
    >

        <Input
            inputName="name"
            inputType="text"
            labelFor="name"
            labelValue={`${ langID === LANG_CZECH ? "Název kategorie*" : "Category name*" }`}
            onChange={handleInputChange}
            placeholder="Food"
            value={newCategory.name}
        />

        <SelectCategoryType
            onChange={handleInputChange}
            value={newCategory.categoryType}  
        />

        {/* Select icon for categoryType */}
        <h3 className="block text-sm mb-4 font-medium text-white">{ langID === LANG_CZECH ? "Vyberte ikonku*" : "Select icon*" }</h3>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            { categoryIcons && categoryIcons.map( (x) => {
                return <AvatarIcon 
                            key={x.id}
                            icon={x.iconJSX} 
                            iconData={x} 
                            handleClick={handleSelectIcon}
                            selectedIcon={selectedIcon}
                        />
            })}
        </div>

        <SuccMsg value={succMsg} />
        <ErrMsg value={errMsg} />

        <input 
            type="submit" 
            disabled={ useCase === USE_CASE_EDIT && !isEdited ? true : false}
            className={`${ 
                useCase === USE_CASE_EDIT && isEdited 
                    ? "button-green" 
                    : useCase === USE_CASE_CREATE 
                        ? "button-green" 
                        : "bg-colorGrayHover hover:bg-colorGrayHover button-green" 
            } w-full mt-6`}            
            value={ langID === LANG_CZECH ? "Uložit" : "Save" } 
        />

        { useCase === USE_CASE_EDIT && (
            <button 
                className="button-green bg-red-500 w-full hover:bg-red-600 mt-4" 
                type="button" 
                onClick={handleDelete}
            >
                { langID === LANG_CZECH ? "Smazat kategorii" : "Delete category" }
            </button>
        )}

    </form>
  )
}

export default NewCategoryForm