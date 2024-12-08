import { ChangeEvent, useState } from "react"
import Input from "../../UI/Input/Input"
import SelectCategoryType from "../../UI/SelectCategoryType/SelectCategoryType"
import { LANG_CZECH } from "../../../config/globals"
import { categoryIcons } from "../../../utils/data/category-icons"
import AvatarIcon from "../../UI/AvatarIcon/AvatarIcon"
import { handleNewCategory } from "../../../API/Categories"

export interface INewCategoryForm {
    categoryType: string
    langID: string
}

const NewCategoryForm: React.FC<INewCategoryForm> = ({ categoryType, langID }) => {

    const [newCategory, setNewCategory] = useState({
        name: "",
        iconID: 0,
        categoryType: categoryType
    })
    const [selectedIcon, setSelectedIcon] = useState(0)

    // TODO - Zrefactorovat
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewCategory( (prev) => ({
            ...prev,
            [name]: name === "iconID" ? parseInt(value, 10) : value,
        }))
    }

    // TODO - Opravit chybu - unikatni ID
    const handleSelectIcon = (id: number) => {
        setNewCategory( (prev) => ({
            ...prev,
            iconID: id
        }))
        setSelectedIcon(id)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await handleNewCategory(newCategory)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-6"
    >

        <Input
            inputName="name"
            inputType="text"
            labelFor="name"
            labelValue="Category name"
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

        <input type="submit" className="button-green w-full" value={ langID === LANG_CZECH ? "Uložit" : "Save" } />

    </form>
  )
}

export default NewCategoryForm