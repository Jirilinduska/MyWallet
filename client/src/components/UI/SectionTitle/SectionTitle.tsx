import { LANG_CZECH } from "../../../config/globals"

interface SectionTitleProps {
    value: string
}

const SectionTitle = ({ value } : SectionTitleProps ) => {
  return <h3 className="font-semibold mb-10">{value}</h3>
}

export default SectionTitle