import { useState } from "react"
import { IconAdd, IconCard, IconCategory, IconMoney, IconMoneyInHand, IconPiggyBank } from "../../utils/icons/icons"
import NewTransModal from "../UI/Modals/NewTransModal/NewTransModal"
import { CATEGORY_ID_TRANSACTION, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS, USE_CASE_CREATE } from "../../config/globals"
import NewCategoryModal from "../UI/Modals/NewCategoryModal/NewCategoryModal"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import NewGoalModal from "../UI/Modals/NewGoalModal/NewGoalModal"
import SpeedDialItem from "../SpeedDialItem/SpeedDialItem"

const SpeedDial = () => {

  const { userLangID } = useUserContext()

  const [isOpen, setIsOpen] = useState(false)
  const [showModalTrans, setShowModalTrans] = useState(false)
  const [showModalCat, setShowModalCat] = useState(false)
  const [showModalGoal, setShowModalGoal] = useState(false)
  const [pageID, setPageID] = useState("")

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleModalTrans = () => setShowModalTrans(!showModalTrans)  
  const toggleModalCat = () => setShowModalCat(!showModalCat)
  const toggleModalGoal = () => setShowModalGoal(!showModalGoal)
 
  const openModalNewExpense = () => {
    setPageID(PAGE_ID_TRANSACTIONS)
    toggleModalTrans()
  }

  const openModalNewIncome = () => {
    setPageID(PAGE_ID_INCOME)
    toggleModalTrans()
  }



  return (
    <div className="relative">

      { showModalTrans && (
        <NewTransModal
          handleHide={toggleModalTrans}
          pageID={pageID}
        />
      )}

      { showModalCat && (
        <NewCategoryModal
          categoryType={CATEGORY_ID_TRANSACTION}
          toggleModal={toggleModalCat}
          useCase={USE_CASE_CREATE}
          selectedCategory={null}
        />
      )}

      { showModalGoal && (
        <NewGoalModal
          toggleModal={toggleModalGoal}
          useCase={USE_CASE_CREATE}
        />
      )}


      {/* Toggle button */}
      <IconAdd
        onClick={toggleMenu}
        className={`${isOpen ? "rotate-[30deg]" : ""} icon text-3xl lg:text-5xl cursor-pointer`}
      />

      {/* Menu container */}
      <div
        className={`${
          isOpen ? "space-y-4" : "hidden"
        } absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center`}
      >
        {/* Nový výdaj */}
        <SpeedDialItem
          icon={<IconCard className="text-3xl icon"/>}
          isLink={false}
          linkPath=""
          value={formatLang(userLangID, "Nový výdaj", "New expense")}
          handleClick={openModalNewExpense}
        />

        {/* Nový příjem */}
        <SpeedDialItem
          icon={<IconMoney className="text-3xl icon" />}
          isLink={false}
          linkPath=""
          value={formatLang(userLangID, "Nový příjem", "New income")}
          handleClick={openModalNewIncome}
        />

        {/* Nový plán */}
        <SpeedDialItem
          icon={<IconMoneyInHand className="text-3xl icon" />}
          isLink={true}
          linkPath="/dashboard/planner"
          value={formatLang(userLangID, "Nový plán", "New plan")}
        />

        {/* Nová kategorie */}
        <SpeedDialItem
          icon={<IconCategory className="text-3xl icon" />}
          isLink={false}
          linkPath=""
          value={formatLang(userLangID, "Nová kategorie", "New category")}
          handleClick={toggleModalCat}
        />

        {/* Nový cíl */}
        <SpeedDialItem
          icon={<IconPiggyBank className="text-3xl icon" />}
          isLink={false}
          linkPath=""
          value={formatLang(userLangID, "Nový cíl", "New goal")}
          handleClick={toggleModalGoal}
        />

      </div>
    </div>
  )
}

export default SpeedDial
