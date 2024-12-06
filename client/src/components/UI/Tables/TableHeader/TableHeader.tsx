import { IString } from "../../../../utils/interfaces/interfaces"

const TableHeader: React.FC<IString> = ({ value }) => {
  return  <th scope="col" className="px-6 py-3">{value}</th>
}

export default TableHeader