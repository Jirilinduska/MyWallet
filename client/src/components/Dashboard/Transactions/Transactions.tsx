import { useState } from "react"
import { IconAdd, IconNext, IconPrev } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"
import TransactionsTable from "../TransactionsTable/TransactionsTable"

const Transactions = () => {

    const [showNewTrans, setShowNewTrans] = useState(false)
    const [date, setDate] = useState( () => {
        const today = new Date()
        return { month: today.getMonth() + 1, year: today.getFullYear() }
    })

    const handleHideNewTransModal = () => setShowNewTrans(false)

    const handlePrevMonth = () => {
        setDate( (prev) => {
            const newMonth = prev.month - 1
            return  newMonth < 1 
            ? { month: 12, year: prev.year - 1 }
            : { month: newMonth, year: prev.year }
        })
    }

    const handleNextMonth = () => {
        setDate( (prev) => {
            const newMonth = prev.month + 1
            return newMonth > 12
            ? { month: 1, year: prev.year + 1 }
            : { month: newMonth, year: prev.year }
        })
    }

    // TODO - Nastavit jazyk
    const getMonthName = new Date(date.year, date.month - 1).toLocaleString("default", { month: "long" })
    const monthName = getMonthName.charAt(0).toUpperCase() + getMonthName.slice(1)

  return (
    <div className="md:ml-[250px] p-6">

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTransModal}    
            />
        )}

        <IconAdd className="icon fixed bottom-10 right-10 text-6xl" onClick={ () => setShowNewTrans(true) }/>

        <h3 className="font-bold text-lg mb-6">Transactions</h3>

        {/* // TODO - Div s šipkami, při kliknutí fetch transactions podle datumu. */}
        {/* // TODO - Přidat loader tabulku  */}
        <div className="flex items-center gap-4">

            <IconPrev onClick={handlePrevMonth} className="icon" />

            <p className="font-semibold">{monthName} {date.year}</p>

            <IconNext onClick={handleNextMonth} className="icon" />

        </div>

        <TransactionsTable/>

    </div>
  )
}

export default Transactions