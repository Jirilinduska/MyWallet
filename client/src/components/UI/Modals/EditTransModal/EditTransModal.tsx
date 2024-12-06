import { IconClose, IconEdit } from "../../../../utils/icons/icons"
import { IEditTransModal } from "../../../../utils/interfaces/interfaces"
import Input from "../../Input/Input"

const EditTransModal: React.FC<IEditTransModal> = ({ toggleEditModal }) => {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

      <div className="relative p-4 w-full max-w-md max-h-full">
        
        <div className="relative rounded-lg shadow bg-gray-700">

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">

            <h3 className="text-lg font-semibold text-white">Edit Transaction</h3>

            <IconClose onClick={toggleEditModal} className="icon"/>

          </div>

          <div className="px-4 pb-6 pt-6 md:px-5 md:pb:20">

              {/* // TODO nebo rovnou přidat inputs? */}
              {/* <Input
                inputName="transTitle"
                inputType="text"
                labelFor="transTitle"
                labelValue="Title"
                onChange={x}
              /> */}

              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">MacBook air Pro</h3>
                <IconEdit className="text-xl cursor-pointer text-green-500"/>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">800 Kč</h3>
                <IconEdit className="text-xl cursor-pointer text-green-500"/>
              </div>

              {/* // TODO  - tady zrefactorovat puvodni select/option u newtransform! */}
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">Select: category</h3>
                <IconEdit className="text-xl cursor-pointer text-green-500"/>
              </div>

          </div>

          {/* <NewTransForm handleHide={handleHide}/> */}

          <div className="py-10">
            
            // TODO - Při delete - přidat are you sure? left:0 absolute :)
            <button className="button-red w-1/2 mx-auto block">Delete this transaction</button>

            <button className="button-green w-1/2 mx-auto block">Save</button>
          </div>
          

        </div>

      </div>

    </div>
  )
}

export default EditTransModal