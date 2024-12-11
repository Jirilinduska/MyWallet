import { useEffect, useState } from "react"
import { useBudgetContext } from "../../context/BudgetsContext"
import { IBudget } from "../../utils/interfaces/interfaces"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import { getMonthName } from "../../utils/functions/dateUtils"
import { useUserContext } from "../../context/UserContext"
import { Link, useParams } from "react-router-dom"
import { IconDelete, IconGoBack } from "../../utils/icons/icons"
import { formatLang } from "../../utils/functions/formatLang"
import { formatCurrency } from "../../utils/functions/formatNumber"
import AreYouSureModal from "../UI/Modals/AreYouSureModal/AreYouSureModal"
import { useNavigate } from "react-router-dom";

// interface OneBudgetPreviewProps {
//   budgetID: string
// }

const OneBudgetPreview = () => {

    const { budgetID } = useParams()
    const navigate = useNavigate()

    const { budgets, refreshBudgets, deleteBudget } = useBudgetContext()
    const { refreshUserData, userLangID, userCurrency } = useUserContext()

    const [thisBudget, setThisBudget] = useState<IBudget | null>(null)
    const [wantDelete, setWantDelete] = useState(false)
   

    useEffect(() => {
      if (budgets.length === 0) refreshBudgets()
   }, [budgets])

  useEffect(() => {
    if(!userLangID) refreshUserData()
  }, [userLangID])

  useEffect(() => {
    if (budgetID) handleFindThisBudget()
 }, [budgetID, budgets])

  const handleFindThisBudget = () => {
    const thisBdgt = budgets.find((x: IBudget) => x._id === budgetID)
    if (thisBdgt) setThisBudget(thisBdgt)
  }

  const toggleWantDelete = () => setWantDelete(!wantDelete)

  const handleDelete = async() => {
    if(thisBudget) {
      try {
        await deleteBudget(thisBudget?._id)
        refreshBudgets()
        navigate("/dashboard/planner")
      } catch (error) {
        console.log(error)
      }
    }
  }

  if(!thisBudget) return <div className="">načítani</div>
 
  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        { wantDelete && <AreYouSureModal handleNo={toggleWantDelete} handleYes={handleDelete} textCS="Chcete odstranit tento plán?" textEN="Want to delete this plan?"/> }

        <div className="flex items-center justify-between  mb-10">

          <Link to="/dashboard/planner">
            <IconGoBack className="icon" />
          </Link>

          <IconDelete className="icon text-red-500 text-4xl" onClick={toggleWantDelete}/>
        </div>

        <SectionTitle value={`${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year})`} />



        <div className="flex items-center gap-4">
          <p className="">{formatLang(userLangID, "Naplánováno", "Planned")}</p>
          <p className="">{formatCurrency(thisBudget.totalPricePlanned, userCurrency)}</p>
        </div>


    </div>
  )
}

export default OneBudgetPreview