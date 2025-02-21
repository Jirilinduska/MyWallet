import Loader from "../../UI/Loader/Loader"
import { useGoalsContext } from "../../../context/GoalsContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import GoalItem from "../../UI/GoalItem/GoalItem"
import HeadingSmall from "../../UI/HeadingSmall/HeadingSmall"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"

const GoalsList = () => {

    const { listOfGoals, loading } = useGoalsContext()
    const { userLangID } = useUserContext()

    const finishedGoals = listOfGoals?.filter( x => x.isFinished )
    const priorityGoals = listOfGoals?.filter( x => x.isPriority && !x.isFinished )
    const notPriorityGoals = listOfGoals?.filter( x => !x.isPriority )

    if(!listOfGoals?.length) return <p className="">{formatLang(userLangID, "Zatím žádné cíle", "No goals yet")}</p>

    if(loading) return <Loader wantFullSize={true} />

  return (

    <div className="">

        {/* Prioritní */}
        <SectionTitle value={formatLang(userLangID, "Prioritní", "Priority")} wantInfo={false} />

        <div className="mb-10 flex flex-wrap gap-6">
            { priorityGoals?.length 
                ? ( priorityGoals.map( x => <GoalItem key={x._id} goal={x} isAchieved={false} /> ) )
                : <HeadingSmall value={formatLang(userLangID, "Žádné prioritní cíle", "No priority goals")} className="!text-sm" />
            }
        </div>

        {/* Ostatní */}
        <SectionTitle value={formatLang(userLangID, "Ostatní", "Other")} wantInfo={false} />

        <div className="flex flex-wrap gap-6 mb-10">
            { notPriorityGoals?.length 
                ? ( notPriorityGoals.map( x => <GoalItem key={x._id} goal={x} isAchieved={false} /> ) )
                : <HeadingSmall value={formatLang(userLangID, "Žádné cíle", "No goals yet")} className="!text-sm" />
            }
        </div>

        {/* Splněné */}
        <SectionTitle value={formatLang(userLangID, "Splněné", "Achieved")} wantInfo={false} />

        <div className="flex flex-wrap gap-6 mb-10">
            { finishedGoals?.length
                ? ( finishedGoals?.map( x => <GoalItem key={x._id} goal={x} isAchieved={true} /> ))
                : ( <HeadingSmall value={formatLang(userLangID, "Žádné splněné cíle", "No achieved goals")} className="!text-sm" /> )
            }
        </div>

    </div>
  )
}

export default GoalsList