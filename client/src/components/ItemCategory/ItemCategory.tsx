import { Link } from "react-router-dom"
import { ICategory } from "../../utils/interfaces/interfaces"
import React from "react"
import { IconDots, IconEdit } from "../../utils/icons/icons"

interface ItemCategoryProps {
    handleOpenEditModal: (category: ICategory) => void
    iconJSX: React.ReactElement | null
    category: ICategory
}

const ItemCategory = ( { handleOpenEditModal, iconJSX, category } : ItemCategoryProps ) => {

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const target = event.target as HTMLElement
        if (target.closest(".icon")) {
          event.preventDefault()
        }
      }

  return (
    <Link
        to={`/dashboard/categories/preview-category/${category._id}`}
        onClick={handleLinkClick}
        className="flex items-center gap-4 p-4 rounded-md cursor-pointer bg-white shadow hover:shadow-lg hover:bg-gray-100 relative"
    >
        <span className="text-sm sm:text-xl lg:text-2xl text-colorBlue">{iconJSX}</span>
        <p className="text-xs sm:text-base xl:text-lg font-medium">{category.name}</p>

        <IconDots 
            onClick={ (e) => {
                e.preventDefault()
                e.stopPropagation()
                handleOpenEditModal(category) 
            }} 
            className="absolute top-1/2 right-2 -translate-y-1/2 icon"
        />
    </Link>
  )
}

export default ItemCategory