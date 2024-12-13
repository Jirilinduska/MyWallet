import { useEffect, useState } from "react"
import { useBudgetContext } from "../../context/BudgetsContext"
import { ICategory, IGetBudget, IGetBudgetCategories } from "../../utils/interfaces/interfaces"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import { getMonthName } from "../../utils/functions/dateUtils"
import { useUserContext } from "../../context/UserContext"
import { Link, useParams } from "react-router-dom"
import { IconAdd, IconDelete, IconGoBack } from "../../utils/icons/icons"
import { formatLang } from "../../utils/functions/formatLang"
import { formatCurrency } from "../../utils/functions/formatNumber"
import AreYouSureModal from "../UI/Modals/AreYouSureModal/AreYouSureModal"
import { useNavigate } from "react-router-dom";
import "animate.css"
import BudgetCatPreviewList from "../BudgetCatPreviewList/BudgetCatPreviewList"
import NewBudgetCatModal from "../UI/Modals/NewBudgetCatModal/NewBudgetCatModal"
import { handleNotification } from "../../utils/functions/notificationsUtils"
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"

const OneBudgetPreview = () => {

    const { budgetID } = useParams()
    const navigate = useNavigate()

    const { budgets, refreshBudgets, deleteBudget, updateBudget } = useBudgetContext()
    const { refreshUserData, userLangID, userCurrency } = useUserContext()

    const [thisBudget, setThisBudget] = useState<IGetBudget | null>(null)
    const [wantDeletePlan, setWantDeletePlan] = useState(false)
    const [wantDeleteCategory, setWantDeleteCategory] = useState(false)
    const [categoryWantDelete, setCategoryWantDelete] = useState("")
    const [wantEdit, setWantEdit] = useState("")
    const [wantNewCategory, setWantNewCategory] = useState(false)
   
  useEffect(() => {
    if(!userLangID) refreshUserData()
  }, [userLangID])

  useEffect(() => {
    if (budgets.length > 0 && budgetID) handleFindThisBudget();
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

  // HOTOVO 
  const handleAddCatClick = async(cat: ICategory) => {

    const newCatData = {
      category: {
        _id: cat._id,
        name: cat.name,
        iconID: cat.iconID
      }, 
      price: 0
    }

    try {
      if(thisBudget) {
        const updateData = {
          _id: thisBudget._id,
          budgetCategories: [ ...thisBudget.budgetCategories, newCatData ],
          month: thisBudget.month,
          year: thisBudget.year,
          totalPricePlanned: 0
        }

        await updateBudget(updateData)
        await refreshBudgets()
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
  
  // HOTOVO 
  const handleDeletePlan = async() => {

    if(thisBudget) {
      try {
        await deleteBudget(thisBudget?._id)
        await refreshBudgets()
        navigate("/dashboard/planner")
        handleNotification(
          NOTIF_SUCCESS, 
          userLangID, 
          `Plán: ${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year}) úspěšně odstraněn`,
          `Budget: ${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year}) successfully deleted`
        )
      } catch (error) {
        handleNotification(NOTIF_ERROR, userLangID, "Něco se pokazilo", "Something went wrong")
      }
    }
  }

  // HOTOVO
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
        totalPricePlanned: 0
      }

      try {
        console.log("Updating thisBudget:", thisBudget)
        await updateBudget(updateData)
        await refreshBudgets()
        // TODO notifikace
        closeWantDeleteCategory()
        handleNotification(NOTIF_SUCCESS, userLangID, `Uloženo`, `Saved`)
      } catch (error) {
        handleNotification(NOTIF_ERROR, userLangID, "Něco se pokazilo", "Something went wrong")
      }

    }
  }

  if(!thisBudget) return <div className="">načítání...</div>

  if (!thisBudget || !thisBudget.budgetCategories) {
    return <div>Loading...</div>; // Nebo jiný placeholder, pokud data ještě nejsou dostupná
  }

 
  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        { wantDeletePlan && (
          <AreYouSureModal 
            handleNo={toggleWantDeletePlan} 
            handleYes={handleDeletePlan} 
            textCS="Chcete odstranit tento plán?" 
            textEN="Want to delete this plan?"
          />
        )}

        { wantDeleteCategory && (
          <AreYouSureModal 
            handleNo={closeWantDeleteCategory} 
            handleYes={handleUpdatePlan} 
            textCS="Chcete odstranit tuto kategorii?" 
            textEN="Want to delete this category?"
          />
        )}

        { wantNewCategory && (
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

        <SectionTitle value={`${getMonthName(thisBudget.year, thisBudget.month, userLangID)} (${thisBudget.year})`} />

        <div className="flex items-center gap-4 mb-10">
          <p>{formatLang(userLangID, "Naplánováno", "Planned")}</p>
          <p>{formatCurrency(thisBudget.totalPricePlanned, userCurrency)}</p>
        </div>

        <div className="flex items-center justify-between mb-0">
          <SectionTitle value={formatLang(userLangID, "Podle kategorií", "By category")}/>
          <IconAdd className="icon mb-10 text-4xl" onClick={toggleWantNewCat}/>
        </div>

        { thisBudget.budgetCategories.length === 0 

          ? <p className="text-center">{formatLang(userLangID, "Tento plán nemá zatím žádné kategorie", "This budget has no categories yet")}</p>
          
          : <BudgetCatPreviewList
              budgetCategories={thisBudget.budgetCategories}
              wantEdit={wantEdit}
              categoryWantDelete={categoryWantDelete}
              userCurrency={userCurrency}
              toggleWantDeleteCat={toggleWantDeleteCat}
              setCategoryWantDelete={setCategoryWantDelete}
              handlePriceChange={handlePriceChange}
              setWantEdit={setWantEdit}
              handleUpdatePlan={handleUpdatePlan}
            />
        }
  </div>
)}

export default OneBudgetPreview
