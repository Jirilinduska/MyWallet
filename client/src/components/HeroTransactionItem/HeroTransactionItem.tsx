import { formatCurrency } from "../../utils/functions/formatNumber"
import { categoryIcons } from "../../utils/icons/category-icons"

interface HeroTransactionItemProps {
    title: string | null
    category: string
    amount: number
    userCurrency: string
    iconID: number
}

const HeroTransactionItem = ({ category, title, amount, userCurrency, iconID } : HeroTransactionItemProps ) => {

    const icon = categoryIcons.find( (icon) => icon.id === iconID)?.iconJSX

  return (
      <div className="my-2 flex items-center justify-between p-2 border-2 border-black">

        {/* Kategory Ikonka */}
        <div className="flex items-center gap-2">
            <span className="text-base sm:text-2xl">{icon}</span>
            <span className="font-semibold text-xs sm:text-base">{ category }</span>
        </div>

        {/* Popisky */}
        <div className="">
            {/* <span className="font-semibold">{ category }</span> */}
            <p className="text-gray-500 text-xs">{ title || "" }</p>
        </div>

        <span className="text-xs sm:text-base">-{formatCurrency(amount, userCurrency)}</span>
        
      </div>
  )
}

export default HeroTransactionItem