import { useState } from "react";
import { IconAdd, IconCard, IconMoney, IconMoneyInHand } from "../../utils/icons/icons";
import { Link } from "react-router-dom"
import NewTransModal from "../UI/Modals/NewTransModal/NewTransModal"
import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../config/globals"

const SpeedDial = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [pageID, setPageID] = useState("")

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleModal = () => setShowModal(!showModal)  

  const openModal = (pageID: string) => {
    setPageID(pageID)
    setShowModal(!showModal)
  }  

  return (
    <div className="relative">

      { showModal && (
        <NewTransModal
          handleHide={toggleModal}
          pageID={pageID}
        />
      )}

      {/* Toggle button */}
      <IconAdd
        onClick={toggleMenu}
        className={`${isOpen ? "rotate-[30deg]" : ""} icon text-5xl cursor-pointer`}
      />

      {/* Menu container */}
      <div
        className={`${
          isOpen ? "space-y-4" : "hidden"
        } absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center`}
      >
        {/* Nový výdaj */}
        <button onClick={ () => openModal(PAGE_ID_TRANSACTIONS)} className="relative group bg-gray-400 p-2 rounded-full">
          <IconCard className="text-3xl icon" />
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-700 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[150px] text-center">
            Nový výdaj
          </span>
        </button>

        {/* Nový příjem */}
        <button onClick={ () => openModal(PAGE_ID_INCOME)} className="relative group bg-gray-400 p-2 rounded-full">
          <IconMoney className="text-3xl icon" />
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-700 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[150px] text-center">
            Nový Příjem
          </span>
        </button>

        {/* Nový plán */}
        <Link to="/dashboard/planner" className="relative group bg-gray-400 p-2 rounded-full">
          <IconMoneyInHand className="text-3xl icon" />
          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-700 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[150px] text-center">
            Nový plán
          </span>
        </Link>

      </div>
    </div>
  );
};

export default SpeedDial;
