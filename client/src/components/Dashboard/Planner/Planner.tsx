import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import MonthYearPicker from "../../UI/DateStuff/MonthYearPicker/MonthYearPicker"
import CreateBudget from "../../CreateBudget/CreateBudget"
import { IconClose } from "../../../utils/icons/icons"
import Button from "../../UI/Button/Button"
import { INewBudget } from "../../../utils/interfaces/interfaces"
import { getMonthName } from "../../../utils/functions/dateUtils"
import BudgetOverview from "../../UI/BudgetOverview/BudgetOverview"
import { useBudgetContext } from "../../../context/BudgetsContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../../config/globals"
import TopBar from "../../UI/TopBar/TopBar"


const Planner = () => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { budgets, refreshBudgets, createBudget } = useBudgetContext()
    const [stage, setStage] = useState(0)


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
      if(stage === 1) {
        const isAlreadyIn = budgets.some((x) => x.year === newBudget.year && x.month === newBudget.month)
        if(isAlreadyIn) {
          handleNotification(NOTIF_ERROR, userLangID, "Plán pro tento měsíc je již vytvořený", "Budget for this year and month is already created")
          return
        }
      }
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

    // CreateBudget
    const handleSubmit = async() => {
      if(!newBudget.budgetCategories.length) {
        handleNotification(NOTIF_ERROR, userLangID, "Prosím nastavte kategorie", "Please set categories")
        return
      }

      try {
        await createBudget(newBudget)
        refreshBudgets()
        setStage(0)
        handleNotification(
          NOTIF_SUCCESS, 
          userLangID, 
          `Plán: ${getMonthName(newBudget.year, newBudget.month, userLangID)} (${newBudget.year}) úspěšně vytvořen`,
          `Budget: ${getMonthName(newBudget.year, newBudget.month, userLangID)} (${newBudget.year}) successfully created`
        )
        setNewBudget({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          budgetCategories: []
        })
      } catch (error) {
        handleNotification(NOTIF_ERROR, userLangID, "Něco se pokazilo", "Something went wrong")
      }
    }

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={false} />

        <SectionTitle value={formatLang(userLangID, "Plánovač výdajů", "Budget planner")} />

        { budgets.length > 0 && stage === 0 && <BudgetOverview budgets={budgets} /> }
        { budgets.length === 0 && stage === 0 && <div className="">No budgets found</div> }

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