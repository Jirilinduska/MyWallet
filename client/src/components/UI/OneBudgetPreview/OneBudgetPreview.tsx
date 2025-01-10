import { useEffect, useState } from "react"
import { useBudgetContext } from "../../../context/BudgetsContext"
import { ICategory, IGetBudget, IGetBudgetCategories } from "../../../utils/interfaces/interfaces"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useUserContext } from "../../../context/UserContext"
import { Link, useParams } from "react-router-dom"
import { IconAdd, IconDelete, IconGoBack } from "../../../utils/icons/icons"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import AreYouSureModal from "../../Modals/AreYouSureModal/AreYouSureModal"
import { useNavigate } from "react-router-dom";
import "animate.css"
import BudgetCatPreviewList from "../BudgetCatPreviewList/BudgetCatPreviewList"
import NewBudgetCatModal from "../../Modals/NewBudgetCatModal/NewBudgetCatModal"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import {NOTIF_SUCCESS } from "../../../config/globals"
import Loader from "../Loader/Loader"
import TopBar from "../../Layout/TopBar/TopBar"
import BudgetChartItem from "../../Charts/BudgetChartItem/BudgetChartItem"
import { handleError } from "../../../Errors/handleError"
import SectionTitle from "../SectionTitle/SectionTitle"
import { hints } from "../../../config/hints"

const OneBudgetPreview = () => {

    const { budgetID } = useParams()
    const navigate = useNavigate()

    const { budgets, refreshBudgets, deleteBudget, updateBudget } = useBudgetContext()
    const { userLangID, userCurrency } = useUserContext()

    const [thisBudget, setThisBudget] = useState<IGetBudget | null>(null)
    const [wantDeletePlan, setWantDeletePlan] = useState(false)
    const [wantDeleteCategory, setWantDeleteCategory] = useState(false)
    const [categoryWantDelete, setCategoryWantDelete] = useState("")
    const [wantEdit, setWantEdit] = useState("")
    const [wantNewCategory, setWantNewCategory] = useState(false)
   

  useEffect(() => {
    if (budgets.length > 0 && budgetID) handleFindThisBudget()
  }, [budgetID, budgets])


  const handleFindThisBudget = () => {
    const thisBdgt = budgets.find((x: IGetBudget) => x._id === budgetID)
    if (thisBdgt) {
        setThisBudget({ ...thisBdgt, budgetCategories: thisBdgt.budgetCategories || [] })
    } else {
      navigate("/dashboard/planner")
    }
  }

  const toggleWantDeletePlan = () => setWantDeletePlan(!wantDeletePlan)
  const toggleWantDeleteCat= () => setWantDeleteCategory(!wantDeletePlan)
  const toggleWantNewCat = () => setWantNewCategory(!wantNewCategory)

  const closeWantDeleteCategory = () => {
      setWantDeleteCategory(false)
      setCategoryWantDelete("")
  }

  const handleAddCatClick = async(cat: ICategory) => {

    const newCatData = {
      category: {
        _id: cat._id,
        name: cat.name,
        iconID: cat.iconID
      }, 
      price: 0,
      spent: 0
    }

    try {
      if(thisBudget) {
        const updateData = {
          _id: thisBudget._id,
          budgetCategories: [ ...thisBudget.budgetCategories, newCatData ],
          month: thisBudget.month,
          year: thisBudget.year,
          totalPricePlanned: 0,
          isFinished: thisBudget.isFinished
        }

        updateBudget(updateData)
        refreshBudgets()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePriceChange = (categoryID: string, newPrice: string) => {

    const parsedPrice = newPrice.trim() === "" ? 0 : parseInt(newPrice, 10)
    
    if (!isNaN(parsedPrice)) {
      const newArray = thisBudget?.budgetCategories?.map((category) => {
        if (category.category._id === categoryID) {
          return { ...category, price: parsedPrice };
        }
        return category;
      }) || [];
    
      setThisBudget((prev) => prev ? { ...prev, budgetCategories: newArray } : null);
    }
  }
  
  const handleDeletePlan = async() => {

    if(thisBudget) {
      try {
        deleteBudget(thisBudget?._id)
        refreshBudgets()
        navigate("/dashboard/planner")
        handleNotification(
          NOTIF_SUCCESS, 
          userLangID, 
          `Plán: ${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year}) úspěšně odstraněn`,
          `Budget: ${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year}) successfully deleted`
        )
      } catch (error) {
        handleError(error, userLangID)
      }
    }
  }

  const handleUpdatePlan = async () => {

    let newArray: IGetBudgetCategories[] = []

    if(thisBudget) {
      if(categoryWantDelete) {
        newArray = thisBudget.budgetCategories.filter( (x) => String(x.category._id) !== String(categoryWantDelete) )
      }
      
      const updateData = {
        _id: thisBudget?._id,
        budgetCategories: categoryWantDelete ? newArray : thisBudget?.budgetCategories,
        month: thisBudget?.month,
        year: thisBudget?.year,
        totalPricePlanned: 0,
        isFinished: false
      }

      try {
        updateBudget(updateData)
        refreshBudgets()
        closeWantDeleteCategory()
        handleNotification(NOTIF_SUCCESS, userLangID, `Uloženo`, `Saved`)
      } catch (error) {
        handleError(error, userLangID)
      }

    }
  }

  if(!thisBudget) return <Loader wantFullSize={true}/>
 
  return (
    <div className="section-padding">

        <TopBar showMonthNavigator={false} showYearNavigator={false}/>

        { wantDeletePlan && (
          <AreYouSureModal 
            handleNo={toggleWantDeletePlan} 
            handleYes={handleDeletePlan} 
            buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")}
            buttonYesValue={formatLang(userLangID, "Odstranit", "Delete")}
            titleValue={formatLang(userLangID, "Chcete odstranit tento plán?", "Want to delete this plan?")}
          />
        )}

        { wantDeleteCategory && (
          <AreYouSureModal 
            handleNo={closeWantDeleteCategory} 
            handleYes={handleUpdatePlan} 
            buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")}
            buttonYesValue={formatLang(userLangID, "Odstranit", "Delete")}
            titleValue={formatLang(userLangID, "Chcete odstranit tuto kategorii?", "Want to delete this category?")}
          />
        )}

        { wantNewCategory && !thisBudget.isFinished && (
          <NewBudgetCatModal
            toggleWantNewCat={toggleWantNewCat}
            budgetCategories={thisBudget.budgetCategories}
            handleAddCatClick={handleAddCatClick}
          />
        )}

        <div className="flex items-center justify-between mb-10">

          <Link to="/dashboard/planner">
            <IconGoBack className="icon" />
          </Link>

          <IconDelete className="icon text-red-500 text-4xl" onClick={toggleWantDeletePlan}/>
        </div>

        <SectionTitle 
          value={`${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year})`}
          wantInfo={ thisBudget.isFinished ? true : false }
          infoValue={formatLang(userLangID, hints.hintFinishedPlanCS, hints.hintFinishedPlanEN)} 
        />

        { thisBudget.isFinished && 
          <p className="text-red-400 font-semibold mb-6">{formatLang(userLangID, "Tento rozpočet je uzavřený", "This budget is finished")}</p> 
        }

        <div className="mb-10">

          <div className="flex items-center gap-4 mb-2">
            <p className="font-semibold">{formatLang(userLangID, "Naplánovaná útrata:", "Planned spending:")}</p>
            <p>{formatCurrency(thisBudget.totalPricePlanned, userCurrency)}</p>
          </div>

          { thisBudget.isFinished && 
            <div className="flex items-center gap-4 ">
              <p className="font-semibold">{formatLang(userLangID, "Skutečná útrata:", "Actual spending:")}</p>
              <p>{formatCurrency(thisBudget.totalPricePlanned, userCurrency)}</p>
            </div> 
          }

        </div>

        <div className="flex items-center justify-between mb-0">
          <h3 className="font-semibold mb-10">{formatLang(userLangID, "Podle kategorií", "By category")}</h3>
          { !thisBudget.isFinished && <IconAdd className="icon mb-10 text-4xl" onClick={toggleWantNewCat}/> }
        </div>

        { thisBudget.budgetCategories.length === 0 

          ? <p className="text-center">
              {formatLang(userLangID, "Tento plán nemá zatím žádné kategorie", "This budget has no categories yet")}
            </p>
          
          : <BudgetCatPreviewList
              key={thisBudget._id}
              budgetCategories={thisBudget.budgetCategories}
              wantEdit={wantEdit}
              categoryWantDelete={categoryWantDelete}
              userCurrency={userCurrency}
              toggleWantDeleteCat={toggleWantDeleteCat}
              setCategoryWantDelete={setCategoryWantDelete}
              handlePriceChange={handlePriceChange}
              setWantEdit={setWantEdit}
              handleUpdatePlan={handleUpdatePlan}
              isFinished={thisBudget.isFinished}
            />
        }

        { thisBudget.budgetCategories.length > 0 && 
            <div className="my-20 xl:flex flex-wrap gap-y-20">
                { thisBudget.budgetCategories.map( x => <BudgetChartItem oneCategory={x} /> ) }
            </div>
        }
  </div>
)}

export default OneBudgetPreview
