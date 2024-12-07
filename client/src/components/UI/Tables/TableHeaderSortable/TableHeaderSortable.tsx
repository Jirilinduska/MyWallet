import { IconSort } from "../../../../utils/icons/icons"
import { IString, ITableHeaderSortable } from "../../../../utils/interfaces/interfaces"

const TableHeaderSortable: React.FC<ITableHeaderSortable> = ({ value, handleSort }) => {
  return (
    <th scope="col" className="px-6 py-3">
        
        <div className="flex items-center">
            
            {value}
        
            {/* // TODO - Přidat sortovací funkce */}
            <IconSort onClick={handleSort} className="w-3 h-3 transition cursor-pointer hover:text-white" />
        </div>
    </th>
  )
}

export default TableHeaderSortable