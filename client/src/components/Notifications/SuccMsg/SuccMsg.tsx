import { IString } from '../../../utils/interfaces/interfaces'

const SuccMsg = ({ value }: IString ) => {
  return <p className="text-green-500 font-bold text-sm">{value}</p>
}

export default SuccMsg