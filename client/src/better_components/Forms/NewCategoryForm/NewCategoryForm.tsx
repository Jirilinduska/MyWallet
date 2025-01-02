import { ChangeEvent, useEffect, useState } from "react"
import Input from "../../../components/UI/Input/Input"
import SelectCategoryType from "../../../components/UI/SelectCategoryType/SelectCategoryType"
import { COLOR_RED, NOTIF_ERROR, NOTIF_INFO, NOTIF_SUCCESS, USE_CASE_CREATE, USE_CASE_EDIT } from "../../../config/globals"
import { categoryIcons } from "../../../utils/icons/category-icons"
import AvatarIcon from "../../../components/UI/AvatarIcon/AvatarIcon"
import { handleDeleteCategory, handleNewCategory, handleUpdateCategory } from "../../../API/Categories"
import { ICategory } from "../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useUserContext } from "../../../context/UserContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { handleError } from "../../../Errors/handleError"
import Button from "../../Common/Button/Button"

export interface NewCategoryFormProps {
    categoryType: string
    langID: string
    useCase: string,
    selectedCategory: ICategory | null
    toggleModal: () => void
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({ categoryType, langID, useCase, selectedCategory, toggleModal }) => {

    const { refreshCategories, deleteCategory } = useCategoriesContext()
    const { userLangID } = useUserContext()

    const [newCategory, setNewCategory] = useState({
        id: selectedCategory?._id || "",
        name: selectedCategory?.name || "",
        iconID: selectedCategory?.iconID || 0,
        categoryType: categoryType
    })
    const [selectedIcon, setSelectedIcon] = useState(0)
    const [isEdited, setIsEdited] = useState(false)

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

    const handleDelete = async () => {
        try {
            deleteCategory(newCategory.id, userLangID, newCategory.name)
            toggleModal()
        } catch (error) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
            toggleModal()
        }
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!newCategory.name) {
            handleNotification(NOTIF_ERROR, userLangID, "Prosím vyplňte název kategorie", "Please enter category name")
            return
        }

        if(!newCategory.iconID) {
            handleNotification(NOTIF_ERROR, userLangID, "Prosím vyberte ikonku", "Please select an icon")
            return
        }

        try {
            if(useCase === USE_CASE_CREATE) {
                await handleNewCategory(newCategory)
                refreshCategories()
                handleNotification(NOTIF_SUCCESS, userLangID, `Kategorie: ${newCategory.name} vytvořena`, `Category: ${newCategory.name} created`)
                toggleModal()
            }
            if(useCase === USE_CASE_EDIT) {
                await handleUpdateCategory(newCategory)
                refreshCategories()
                handleNotification(NOTIF_SUCCESS, userLangID, "Změny byly úspěšně uloženy", "Changes have been successfully saved")
                toggleModal()
            }
        } catch (error) {
            console.log(error)
            handleError(error, userLangID)
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
            labelValue={formatLang(langID, "Název kategorie*", "Category name*")}
            onChange={handleInputChange}
            placeholder="Food"
            value={newCategory.name}
        />

        <SelectCategoryType
            onChange={handleInputChange}
            value={newCategory.categoryType}  
        />

        {/* Select icon for categoryType */}
        <h3 className="block text-sm mb-4 font-medium text-white">{formatLang(langID, "Vyberte ikonku*", "Select icon*")}</h3>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 overflow-y-auto h-[150px] py-4">
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
            value={formatLang(langID, "Uložit", "Save")} 
        />

        { useCase === USE_CASE_EDIT && (
            <Button 
                color={COLOR_RED} 
                loading={false} 
                value={formatLang(langID, "Smazat kategorii", "Delete category")} 
                handleClick={handleDelete} 
                buttonType="button"
            />
        )}

    </form>
  )
}

export default NewCategoryForm