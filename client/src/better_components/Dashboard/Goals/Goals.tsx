import { useState } from "react"
import GoalsList from "../../../components/GoalsList/GoalsList"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { COLOR_BLUE, USE_CASE_CREATE } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import Button from "../../UI/Button/Button"
import TopBar from "../../Layout/TopBar/TopBar"
import NewGoalModal from "../../../components/UI/Modals/NewGoalModal/NewGoalModal"
import { hints } from "../../../utils/data/hints"
import { usePageTitle } from "../../../hooks/usePageTitle"

const Goals = () => {

    const { userLangID } = useUserContext()

    usePageTitle(formatLang(userLangID, "Cíle", "Goals"))

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => setShowModal( prev => !prev)

  return (
    <div className="section-padding">

        { showModal && <NewGoalModal toggleModal={toggleModal} useCase={USE_CASE_CREATE} /> }

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <div className="flex items-center justify-between">

            <SectionTitle 
                value={formatLang(userLangID, "Cíle", "Goals")} 
                wantInfo={true} 
                infoValue={formatLang(userLangID, hints.hintGoalsCS, hints.hintGoalsEN)}
            />

            <div className="mb-10">
                <Button handleClick={toggleModal} color={COLOR_BLUE} loading={false} value={formatLang(userLangID, "Nový cíl", "New goal")} buttonType="button" />
            </div>

        </div>

        <GoalsList/>

    </div>
  )
}

export default Goals