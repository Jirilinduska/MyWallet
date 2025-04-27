import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import MonthYearPicker from "../../UI/MonthYearPicker/MonthYearPicker"
import CreateBudget from "../../UI/CreateBudget/CreateBudget"
import { IconClose } from "../../../utils/icons/icons"
import { IGetBudget, INewBudget } from "../../../utils/interfaces/interfaces"
import { getMonthName } from "../../../utils/functions/dateUtils"
import BudgetOverview from "../../UI/BudgetOverview/BudgetOverview"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../../config/globals"
import TopBar from "../../Layout/TopBar/TopBar"
import { hints } from "../../../config/hints"
import { usePageTitle } from "../../../hooks/usePageTitle"
import { Button } from "@mui/material"
import { handleCreateBudget, handleGetAllBudgets } from "../../../API/Budget"
import Loader from "../../UI/Loader/Loader"
import { handleError } from "../../../Errors/handleError"


const Planner = () => {

    const { userLangID } = useUserContext()
    const [stage, setStage] = useState(0)

    const [budgets, setBudgets] = useState<IGetBudget[] | null>(null)

    const [newBudget, setNewBudget] = useState<INewBudget>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      budgetCategories: []
    })

    usePageTitle(formatLang(userLangID, "Rozpočty", "Budgets"))

    const incStage = () =>  {
      if(!budgets) return
      if(stage === 1) {
        const isAlreadyIn = budgets.some((x) => x.year === newBudget.year && x.month === newBudget.month)
        if(isAlreadyIn) {
          handleNotification(NOTIF_ERROR, userLangID, "Rozpočet pro tento měsíc je již vytvořený", "Budget for this year and month is already created")
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
        await createNewBudget()
      } else {
        incStage()
      }
    }

    const createNewBudget = async() => {
      if(!newBudget.budgetCategories.length) {
        handleNotification(NOTIF_ERROR, userLangID, "Prosím přidejte kategorie", "Please add categories")
        return
      }

      try {
        const result = await handleCreateBudget(newBudget)
        setBudgets(prev => [...(prev ?? []), result.data.newBudget])
        setStage(0)
        handleNotification(
          NOTIF_SUCCESS, 
          userLangID, 
          `Rozpočet: ${getMonthName(newBudget.year, newBudget.month, userLangID)} (${newBudget.year}) úspěšně vytvořen`,
          `Budget: ${getMonthName(newBudget.year, newBudget.month, userLangID)} (${newBudget.year}) successfully created`
        )
        setNewBudget({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          budgetCategories: []
        })

      } catch (error) {
          handleError(error,userLangID)
      }
    }

    const monthName = getMonthName(newBudget.year, newBudget.month, userLangID)

    useEffect(() => {
      const fetchData = async() => {
        const result = await handleGetAllBudgets()
        setBudgets(result.data)
      }
      fetchData()
    }, [])

 
    if(!budgets) return <Loader wantFullSize={true}/>
    
  return (
    <div className="section-padding">

        <TopBar/>

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
              onClick={incStage}
              variant="contained"
              size="medium"
            >
              {formatLang(userLangID, "Vytvořit rozpočet", "Create budget")} 
            </Button>
          </div>
        )}

        { budgets.length > 0 && stage === 0 && <BudgetOverview budgets={budgets.filter(x => !x.isFinished)} isFinished={false} /> }
        { budgets.length > 0 && stage === 0 && <BudgetOverview budgets={ budgets.filter(x => x.isFinished)} isFinished={true} /> }

        { stage > 0 && (
            <div className="p-4 border-t-2 border-black">

              { stage > 0 && (
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xs">{ formatLang(userLangID, "Vytvořit nový plán", "Create new plan") }</h3> 
                  <IconClose onClick={ () => setStage(0) } className="icon text-red-500 text-3xl"/>
                </div>
              )}

              { stage > 0 &&  <p className="my-4">{monthName} ({newBudget.year})</p> }
              { stage === 1 && <MonthYearPicker userLangID={userLangID} setNewBudget={setNewBudget}/> }
              { stage === 2 && <CreateBudget newBudget={newBudget} setNewBudget={setNewBudget}/> }

              { stage > 0 && (
                <div className="flex items-center flex-col justify-between w-full sm:w-[250px] gap-4 mx-auto my-10 sm:flex-row">

                  <Button
                    onClick={decStage}
                    color={stage === 1 ? "error" : "primary"}
                    variant="contained"
                  >
                    {`${stage === 1 ? `${formatLang(userLangID, "Zrušit", "Cancel")}` : `${formatLang(userLangID, "Předchozí", "Prev")}`}`} 
                  </Button>

                  <Button
                    onClick={handleNextButtonClick}
                    color={stage === 2 ? "success" : "primary"}
                    variant="contained"
                  >
                    {`${stage === 2 ? `${formatLang(userLangID, "Uložit", "Save")}` : `${formatLang(userLangID, "Další", "Next")}`}`} 
                  </Button>

                </div>
              )}

            </div>
          )}

    </div>
  )
}

export default Planner