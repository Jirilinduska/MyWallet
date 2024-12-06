import { ITableRow } from "../../../../utils/interfaces/interfaces"

const TableRow: React.FC<ITableRow> = ({ dateValue, titleValue, categoryValue, priceValue, toggleEditModal }) => {


  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
        <td className="px-6 py-4">{dateValue}</td>

        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {titleValue}
        </th>

        <td className="px-6 py-4">{categoryValue}</td>
        
        <td className="px-6 py-4">{priceValue} Kč</td>
    
        <td className="px-6 py-4 text-right">
    
            <span onClick={toggleEditModal} className="font-medium text-blue-500 cursor-pointer hover:underline">
                Edit
            </span>
        </td>

    </tr>
  )
}

export default TableRow