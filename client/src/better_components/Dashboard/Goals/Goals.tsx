import { useState } from "react"
import GoalsList from "../../../components/GoalsList/GoalsList"
import SectionTitle from "../../../components/UI/SectionTitle/SectionTitle"
import { COLOR_BLUE } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import Button from "../../Common/Button/Button"
import TopBar from "../../Layout/TopBar/TopBar"
import NewGoalModal from "../../../components/UI/Modals/NewGoalModal/NewGoalModal"

// TODO - ProfileCart a SettingsCart přejmenovat na CARD s D!

const Goals = () => {

    const { userLangID } = useUserContext()

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => setShowModal( prev => !prev)

  return (
    <div className="section-padding">

        { showModal && <NewGoalModal toggleModal={toggleModal}/> }

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <div className="flex items-center justify-between">

            <div className="flex gap-2">
                <SectionTitle value={formatLang(userLangID, "Cíle", "Goals")}/>
                {/* // TODO - při hoveru - info - přidat všude na stránku:) */}
                <p className="">i (ikonka) - tady info jak to funguej</p>
            </div>

            <div className="mb-10">
                <Button handleClick={toggleModal} color={COLOR_BLUE} loading={false} value={formatLang(userLangID, "Nový cíl", "New goal")} buttonType="button" />
            </div>

        </div>

        <GoalsList/>

    </div>
  )
}

export default Goals