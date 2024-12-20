import { LANG_CZECH } from "../../../../config/globals"


interface TableRowProps {
  dateValue: string
  titleValue: string
  categoryValue: string
  priceValue: number
  toggleEditModal: () => void
  userLangID: string
  userCurrency: string
  categoryIcon: React.ReactElement | null
}


const TableRow: React.FC<TableRowProps> = ({ dateValue, titleValue, categoryValue, priceValue, toggleEditModal, userLangID, userCurrency, categoryIcon }) => {


  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
        <td className="px-6 py-4">{dateValue}</td>

        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {titleValue}
        </th>

        <td className="px-6 py-4 flex items-center gap-2">
          <span className="">{categoryIcon}</span>
          <span className="">{categoryValue}</span>
        </td>
        
        <td className="px-6 py-4">{priceValue} {userCurrency}</td>
    
        <td className="px-6 py-4 text-right">
            <span onClick={toggleEditModal} className="font-medium text-blue-500 cursor-pointer hover:underline">
                { userLangID === LANG_CZECH ? "Upravit" : "Edit" }
            </span>
        </td>

    </tr>
  )
}

export default TableRow