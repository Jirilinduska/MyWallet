import { LANG_CZECH, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"
import { IconClose } from "../../../../utils/icons/icons"
import { INewTransModal } from "../../../../utils/interfaces/interfaces"
import NewTransForm from "../../../Forms/NewTransForm/NewTransForm"

const NewTransModal: React.FC<INewTransModal> = ({ handleHide, fetchIncomeData, fetchTransData, pageID, langID}) => {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">
            
          <div className="relative rounded-lg shadow bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">

              { pageID === PAGE_ID_TRANSACTIONS && <h3 className="text-lg font-semibold text-white">{ langID === LANG_CZECH ? "Nový výdaj" : "New Transaction" }</h3> }
              { pageID === PAGE_ID_INCOME && <h3 className="text-lg font-semibold text-white">{ langID === LANG_CZECH ? "Nový příjem" : "New income" }</h3> }

              <IconClose onClick={handleHide} className="icon"/>

            </div>

            <NewTransForm 
              handleHide={handleHide}
              fetchIncomeData={fetchIncomeData}
              fetchTransData={fetchTransData}
              pageID={pageID}
            />

          </div>

        </div>

      </div>
    )
}
  
  export default NewTransModal
  