import { IconSort } from "../../../../utils/icons/icons"
import { IString } from "../../../../utils/interfaces/interfaces"

const TableHeaderSortable: React.FC<IString> = ({ value }) => {
  return (
    <th scope="col" className="px-6 py-3">
        
        <div className="flex items-center">
            
            {value}
        
            {/* // TODO - Přidat sortovací funkce */}
            <a href="#" className="ms-1.5">
                <IconSort className="w-3 h-3" />
            </a>
        </div>
    </th>
  )
}

export default TableHeaderSortable