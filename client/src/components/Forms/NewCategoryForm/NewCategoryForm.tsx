import { ChangeEvent, useEffect, useState } from "react"
import SelectCategoryType from "../../UI/SelectCategoryType/SelectCategoryType"
import { COLOR_RED, NOTIF_ERROR, NOTIF_SUCCESS, USE_CASE_CREATE, USE_CASE_EDIT } from "../../../config/globals"
import { categoryIcons } from "../../../utils/icons/category-icons"
import AvatarIcon from "../../UI/AvatarIcon/AvatarIcon"
import { handleNewCategory, handleUpdateCategory } from "../../../API/Categories"
import { ICategory } from "../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useUserContext } from "../../../context/UserContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { handleError } from "../../../Errors/handleError"
// import Button from "../../UI/Button/Button"
import { Button, TextField, Typography } from "@mui/material"

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
            handleError(error, userLangID)
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
            handleError(error, userLangID)
        }
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-6 relative"
    >

        <TextField
            value={newCategory.name}
            onChange={(e) => setNewCategory(prev => ({...prev, name: e.target.value}))}
            label={formatLang(langID, "Název kategorie*", "Category name*")}
            fullWidth
            size="small"
        />

        <SelectCategoryType
            onChange={handleInputChange}
            value={newCategory.categoryType}  
        />

        {/* Select icon for categoryType */}
        <Typography fontSize={14}>{formatLang(langID, "Vyberte ikonku*", "Select icon*")}</Typography>

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

        <Button
            type="submit"
            disabled={ useCase === USE_CASE_EDIT && !isEdited ? true : false}
            variant="contained"
            color="success"
            fullWidth
            sx={{ mb: 2 }}
        >
            {formatLang(langID, "Uložit", "Save")} 
        </Button>

        { useCase === USE_CASE_EDIT && (
            <Button
                color="error"
                variant="contained"
                onClick={handleDelete}
                fullWidth
            >
                {formatLang(langID, "Smazat kategorii", "Delete category")} 
            </Button>
        )}

    </form>
  )
}

export default NewCategoryForm