import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"


// TODO - FormatLang používat všude :) + formatCurrency také
import { formatLang } from "../../../utils/functions/formatLang"
import MonthYearPicker from "../../UI/DateStuff/MonthYearPicker/MonthYearPicker"
import CreateBudget from "../../CreateBudget/CreateBudget"
import { IconClose } from "../../../utils/icons/icons"
import Button from "../../UI/Button/Button"
import { INewBudget } from "../../../utils/interfaces/interfaces"
import { getMonthName } from "../../../utils/functions/dateUtils"
import ErrMsg from "../../Notifications/ErrMsg/ErrMsg"
import BudgetOverview from "../../UI/BudgetOverview/BudgetOverview"
import OneBudgetPreview from "../../OneBudgetPreview/OneBudgetPreview"
import { useBudgetContext } from "../../../context/BudgetsContext"
import { useParams } from "react-router-dom"


export interface PlannerProps {
  budgetID: string | undefined
}

const Planner = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { budgets, refreshBudgets, createBudget } = useBudgetContext()

    const { budgetID } = useParams()

    const [stage, setStage] = useState(0)
    const [msg, setMsg] = useState({
      err: "",
      succ: ""
    })

    const [newBudget, setNewBudget] = useState<INewBudget>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      budgetCategories: []
    })

    useEffect(() => {
      if(!userLangID) refreshUserData()
    }, [userLangID] )

    useEffect(() => {
      if(!budgets) refreshBudgets()
    }, [budgets])

    const incStage = () =>  {
      setStage( (prev) => prev + 1 )
    }

    const decStage = () =>  {
      if(stage === 0) return
      setStage( (prev) => prev - 1 )
    }

    const handleNextButtonClick = () => {
      if(stage === 2) {
        handleSubmit()
      } else {
        incStage()
      }
    }

    const monthName = getMonthName(newBudget.year, newBudget.month, userLangID)

    const handleSubmit = async() => {

      // TODO - Zmenit errMsg :) + Multilanguage
      // TODO - Ošetřit chybu, pokud už pro daný měsic rok budget existuje 
      if(!newBudget.budgetCategories.length) {
        setMsg({...msg, err: "Please select some budget"})
        return
      }

      try {
        await createBudget(newBudget)
        refreshBudgets()
        setStage(0)
        setNewBudget({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          budgetCategories: []
        })
      } catch (error) {
        // TODO - ošetřit error
      }
    }

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        <SectionTitle value={formatLang(userLangID, "Plánovač výdajů", "Budget planner")} />

        { budgets.length > 0 && <BudgetOverview budgets={budgets} /> }

        {/* // Vytvořit nový plán */}
        { stage === 0 && (
          <div className="flex items-center justify-center">
            <Button 
              buttonValue={formatLang(userLangID, "Vytvořit plán", "Create plan")} 
              className="button-blue" 
              handleClick={incStage}
            />
          </div>
        )}

        { stage > 0 && (
            <div className="p-4 border-t-2 border-black">

              { stage > 0 && (
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{ formatLang(userLangID, "Vytvořit nový plán", "Create new plan") }</h3> 
                  <IconClose onClick={ () => setStage(0) } className="icon text-red-500 text-3xl"/>
                </div>
              )}

              { stage > 0 &&  <p className="my-4">{monthName} ({newBudget.year})</p> }

              <ErrMsg value={msg.err}/>

              { stage === 1 && <MonthYearPicker userLangID={userLangID} setNewBudget={setNewBudget}/> }
              { stage === 2 && <CreateBudget newBudget={newBudget} setNewBudget={setNewBudget}/> }

              { stage > 0 && (
                <div className="flex items-center justify-center gap-10 my-10">

                  <Button 
                    className="button-blue"
                    buttonValue={`${stage === 1 ? `${formatLang(userLangID, "Zrušit", "Cancel")}` : `${formatLang(userLangID, "Předchozí", "Prev")}`}`} 
                    handleClick={decStage}
                  />

                  <Button 
                    className="button-blue"
                    buttonValue={`${stage === 2 ? `${formatLang(userLangID, "Uložit", "Save")}` : `${formatLang(userLangID, "Další", "Next")}`}`} 
                    handleClick={handleNextButtonClick}
                  />

                </div>
              )}

            </div>
          )}

    </div>
  )
}

export default Planner