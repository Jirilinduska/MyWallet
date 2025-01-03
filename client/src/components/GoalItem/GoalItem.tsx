import { useState } from "react"
import { useOverviewData } from "../../context/OverviewDataContext"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { formatCurrency } from "../../utils/functions/formatNumber"
import { IGoal } from "../../utils/interfaces/interfaces"
import { IconCheck, IconDelete, IconEdit, IconPointDown} from "../../utils/icons/icons"
import AreYouSureModal from "../UI/Modals/AreYouSureModal/AreYouSureModal"
import { useGoalsContext } from "../../context/GoalsContext"

interface GoalItemProps {
    goal: IGoal
}

const GoalItem = ({ goal } : GoalItemProps ) => {

    const { userLangID, userCurrency } = useUserContext()
    const { savedThisYear } = useOverviewData()
    const { deleteGoal, setFinishedGoal } = useGoalsContext()

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalFinish, setShowModalFinish] = useState(false)

    const [showIcons, setShowIcons] = useState(false)

    const toggleDeleteModal = () => setShowModalDelete(!showModalDelete)
    const toggleFinishModal = () => setShowModalFinish(!showModalFinish)
    const toggleIcons = () => setShowIcons(!showIcons)

    const percentage = goal.amount > 0 ? Math.min(Math.round((savedThisYear / goal.amount) * 100), 100) : 0

    const barColor = percentage >= 100 ? "bg-green-500" : percentage > 50 ? "bg-blue-500" : "bg-orange-500"
                    

    // TODO - Přidat mazání itemů + edit?

    const handleDeleteThisGoal = async() => {
        if(goal._id) deleteGoal(goal._id)
    }

    const handleSetFinishGoal = async() => {
        if(goal._id) setFinishedGoal(goal._id)
    }

  return (

    <div className={` ${showIcons ? "h-[300px]" : "h-[180px]"} ring-2 rounded-lg flex flex-col p-4 shadow-lg w-[280px] transition-all duration-500`}>

        { showModalDelete && 
            <AreYouSureModal 
                handleNo={toggleDeleteModal} 
                handleYes={handleDeleteThisGoal} 
                buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")}
                buttonYesValue={formatLang(userLangID, "Odstranit", "Delete")}
                titleValue={formatLang(userLangID, `Odstranit cíl ${goal.title}?`, `Delete goal ${goal.title}?`)}
            /> 
        }
        
        { showModalFinish && 
            <AreYouSureModal 
                handleNo={toggleFinishModal} 
                handleYes={handleSetFinishGoal} 
                buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")}
                buttonYesValue={formatLang(userLangID, "Ano", "Yes")}
                titleValue={formatLang(userLangID, `Označit cíl ${goal.title} jako splněný?`, `Mark goal ${goal.title} as achieved?`)}
            /> 
        }

        <div className="mb-6 flex items-center justify-between">

            <h3 className="font-semibold">{goal.title}</h3>
            <p className="text-right text-xs font-semibold">{goal.year}</p>
            
        </div>


        <div className="bg-black h-[5px] mb-2 relative overflow-hidden rounded">
                <div 
                    className={`${barColor} h-full duration-1000 `} 
                    style={{ width: `${percentage}%` }}
                ></div>
        </div>


        <div className="text-xs flex items-center justify-between mb-6">
            <span className={`${ percentage >= 100 && "font-semibold" }`}>{`${percentage}%`}</span>
            <div className="">
                { (!goal.isFinished && percentage !== 100) && <span className="">{savedThisYear.toLocaleString()} / </span> }
                <span className="font-semibold">{formatCurrency(goal.amount, userCurrency)}</span>
            </div>
        </div>


        <p className="text-xs font-semibold text-colorGreen mb-6 flex justify-between items-start">
            {goal.isPriority ? formatLang(userLangID, "Prioritní cíl", "Priority goal") : null}
            <IconPointDown onClick={toggleIcons} className={`icon text-blue-500 cursor-pointer transition-transform duration-300 ${showIcons ? "rotate-180" : "rotate-0"} ml-auto`} />
        </p>


        {/* Ikonky */}
        <div className={`${showIcons ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"} space-y-4 transition-all duration-500 ease-in-out overflow-hidden mt-auto`}>

            <div className="flex items-center justify-between gap-4">
                
                {/* EDIT */}
                <div className="flex items-center gap-2 p-2 cursor-pointer w-1/2 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <IconEdit className="icon" />
                    <span className="text-xs">{formatLang(userLangID, "Upravit", "Edit")}</span>
                </div>

                {/* DELETE */}
                <div onClick={toggleDeleteModal} className="flex items-center gap-2 p-2 cursor-pointer w-1/2 font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <IconDelete className="icon" />
                    <span className="text-xs">{formatLang(userLangID, "Odstranit", "Delete")}</span>
                </div>
            </div>
                        
            {/* MARK AS FINISHED */}
            { percentage >= 100 && (
                <div onClick={toggleFinishModal} className="flex items-center gap-2 p-2 cursor-pointer font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <IconCheck className="icon" />
                    <span className="text-xs">{formatLang(userLangID, "Označit jako splněné", "Mark as achieved")}</span>
                </div>
            )}
        
        </div>

    </div>
  )

}


export default GoalItem