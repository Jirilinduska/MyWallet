import { useState } from "react"
import { IconAdd } from "../../../utils/icons/icons"
import NewTransModal from "../../UI/Modals/NewTransModal/NewTransModal"

const Transactions = () => {

    const [showNewTrans, setShowNewTrans] = useState(false)

    const handleHideNewTrans = () => setShowNewTrans(false)

  return (
    <div className="md:ml-[250px] p-6">

        { showNewTrans && (
            <NewTransModal
                handleHide={handleHideNewTrans}
            />
        )}

        <IconAdd className="icon fixed bottom-10 right-10 text-6xl" onClick={ () => setShowNewTrans(true) }/>

        <h3 className="font-bold">Transactions</h3>

        <div className="">Date stuff</div>


    </div>
  )
}

export default Transactions