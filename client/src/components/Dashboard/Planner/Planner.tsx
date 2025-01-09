import { useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import MonthYearPicker from "../../UI/MonthYearPicker/MonthYearPicker"
import CreateBudget from "../../UI/CreateBudget/CreateBudget"
import { IconClose } from "../../../utils/icons/icons"
import { INewBudget } from "../../../utils/interfaces/interfaces"
import { getMonthName } from "../../../utils/functions/dateUtils"
import BudgetOverview from "../../UI/BudgetOverview/BudgetOverview"
import { useBudgetContext } from "../../../context/BudgetsContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { COLOR_BLUE, NOTIF_ERROR, NOTIF_SUCCESS } from "../../../config/globals"
import TopBar from "../../Layout/TopBar/TopBar"
import Button from "../../UI/Button/Button"
import { hints } from "../../../config/hints"


const Planner = () => {

    const { userLangID } = useUserContext()
    const { budgets, refreshBudgets, createBudget } = useBudgetContext()
    const [stage, setStage] = useState(0)


    const [newBudget, setNewBudget] = useState<INewBudget>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      budgetCategories: []
    })

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

    const handleNextButtonClick = async() => {
      if(stage === 2) {
        await handleSubmit()
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

      createBudget(newBudget)
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
    }

    const finishedBudgets = budgets.filter(x => x.isFinished)
    const ongoingBudgets  = budgets.filter(x => !x.isFinished)  

    // TODO - Po uložení budgetu nového, NAČÍST VŠECHNY! (REFRESH)
    // TODO -PODOBNE I U BUDGET CATEGORIES

  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={false} />

        <SectionTitle 
          value={formatLang(userLangID, "Rozpočty", "Budgets")} 
          wantInfo={true} 
          infoValue={formatLang(userLangID, hints.hintPlannerCS, hints.hintPlannerEN)}
        />

        { budgets.length === 0 && stage === 0 && <p className="text-center mb-10">{formatLang(userLangID, "Žádné rozpočty", "No budgets")}</p> }

        {/* // Vytvořit nový plán */}
        { stage === 0 && (
          <div className="w-[200px] mx-auto mb-10">
            <Button
              color={COLOR_BLUE}
              loading={false}
              value={formatLang(userLangID, "Vytvořit rozpočet", "Create budget")} 
              handleClick={incStage}
            />
          </div>
        )}

        { budgets.length > 0 && stage === 0 && <BudgetOverview budgets={ongoingBudgets} isFinished={false} /> }
        { budgets.length > 0 && stage === 0 && <BudgetOverview budgets={finishedBudgets} isFinished={true} /> }

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
                <div className="flex items-center justify-between w-[250px] gap-4 mx-auto my-10">

                  <Button
                    color={COLOR_BLUE}
                    loading={false}
                    value={`${stage === 1 ? `${formatLang(userLangID, "Zrušit", "Cancel")}` : `${formatLang(userLangID, "Předchozí", "Prev")}`}`} 
                    handleClick={decStage}
                  />

                  <Button
                    color={COLOR_BLUE}
                    loading={false}
                    value={`${stage === 2 ? `${formatLang(userLangID, "Uložit", "Save")}` : `${formatLang(userLangID, "Další", "Next")}`}`} 
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