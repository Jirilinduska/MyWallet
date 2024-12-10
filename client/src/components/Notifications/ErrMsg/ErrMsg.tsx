import { IString } from '../../../utils/interfaces/interfaces'

const ErrMsg = ( { value } : IString) => {
  return <p className="text-red-500 font-bold text-sm">{value}</p>
}

export default ErrMsg