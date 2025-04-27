import { useEffect, useState } from "react"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useUserContext } from "../../../context/UserContext"
import { Link, useParams } from "react-router-dom"
import { IconAdd, IconArrowDown, IconDelete, IconEdit, IconGoBack } from "../../../utils/icons/icons"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import AreYouSureModal from "../../Modals/AreYouSureModal/AreYouSureModal"
import { useNavigate } from "react-router-dom";
import "animate.css"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import {NOTIF_SUCCESS } from "../../../config/globals"
import Loader from "../Loader/Loader"
import TopBar from "../../Layout/TopBar/TopBar"
import { handleError } from "../../../Errors/handleError"
import SectionTitle from "../SectionTitle/SectionTitle"
import { hints } from "../../../config/hints"
import { handleAddCategoryToBudget, handleDeleteBudget, handleDeleteCatFromBudget, handleEditCatAmount, handleGetBudgetByID } from "../../../API/Budget"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Tooltip, Typography } from "@mui/material"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { BarChart } from "@mui/x-charts"
import EditBudgetPriceModal from "../../Modals/EditBudgetPriceModal/EditBudgetPriceModal"
import NewBudgetCatModalMUI from "../../Modals/NewBudgetCatModal/NewBudgetCatModalMUI"

export interface BudgetCategories2 {
  categoryID: {
    iconID: number,
    name: string,
    _id: string
  }
  price: number,
  spent: number,
  _id: string
}

interface IBudgetPreview {
  _id: string,
  month: number,
  year: number,
  isFinished: boolean,
  plannedPrice: number,
  spentPrice: number,
  budgetCategories: BudgetCategories2[]
}

const OneBudgetPreview = () => {

    const { budgetID } = useParams()
    const navigate = useNavigate()

    const { userLangID, userCurrency } = useUserContext()

    const [wantDeletePlan, setWantDeletePlan] = useState(false)
    const [budgetData, setBudgetData] = useState<IBudgetPreview | null>(null)
    const [refreshBudget, setRefreshBudget] = useState(0)
    const [wantDeleteCategory, setWantDeleteCategory] = useState("")
    const [editPrice, setEditPrice] = useState("")
    const [loading, setLoading] = useState(false)

    const toggleWantDeletePlan = () => setWantDeletePlan(!wantDeletePlan)
    const handleRefreshBudget = () => setRefreshBudget(prev => prev + 1)
    const toggleLoading = () => setLoading(prev => !prev)
    const [wantNewCategory, setWantNewCategory] = useState(false)
    const toggleWantNewCat = () => setWantNewCategory(!wantNewCategory)

  const addCategoryToBudget = async(catID: string) => {
    if(!budgetData) return
    if(budgetData.isFinished) return
    try {
      toggleLoading()
      await handleAddCategoryToBudget(catID, budgetData._id)
      handleRefreshBudget()
    } catch (error) {
      handleError(error, userLangID)
    } finally {
      toggleLoading()
    }
  }

  // * HOTOVO
  const handleChangePrice = async(value: number, catID: string) => {
    if(!budgetData) return
    if(editPrice === "") return
    if(editPrice !== catID) return
    try {
      toggleLoading()
      await handleEditCatAmount(catID, budgetData._id, value)
      setEditPrice("")
      handleNotification(
        NOTIF_SUCCESS, 
        userLangID, 
        "Uloženo",
        "Saved"
      )
      handleRefreshBudget()
    } catch (error) {
      handleError(error, userLangID)
    } finally {
      toggleLoading()
    }
  }
  
  // * HOTOVO 
  const handleDeletePlan = async() => {
    if(!budgetData) return
    try {
      await handleDeleteBudget(budgetData._id)
      navigate("/dashboard/planner")
      handleNotification(
        NOTIF_SUCCESS, 
        userLangID, 
        `Plán: ${getMonthName(budgetData.year, budgetData.month, userLangID)} (${budgetData.year}) úspěšně odstraněn`,
        `Budget: ${getMonthName(budgetData.year, budgetData.month, userLangID)} (${budgetData.year}) successfully deleted`
      )
    } catch (error) {
      handleError(error, userLangID)
    } finally {
      toggleLoading()
    }
  }

  // * HOTOVO 
  const deleteCatFromBudget = async(categoryID: string) => {
    if(!budgetData) return
    try {
      toggleLoading()
      await handleDeleteCatFromBudget(categoryID, budgetData._id)
      handleRefreshBudget()
      setWantDeleteCategory("")
      handleNotification(
        NOTIF_SUCCESS, 
        userLangID, 
        "Kategorie odstraněna z rozpočtu",
        "Category deleted from budget"
      )
    } catch (error) {
      handleError(error, userLangID)
    } finally {
      toggleLoading()
    }
  }

  // * HOTOVO 
  useEffect(() => {
    const fetchData = async() => {
      if(!budgetID) return 
      try {
        toggleLoading()
        const response = await handleGetBudgetByID(budgetID)
        setBudgetData(response.data)
      } catch (error) {
        navigate("/dashboard/planner")
      } finally {
        toggleLoading()
      }

    }
    fetchData()
  }, [budgetID, refreshBudget])

  if(!budgetData || !budgetID) return <Loader wantFullSize={true}/>
 
  return (
    <div className="section-padding">

        <TopBar />

        { wantDeletePlan && (
          <AreYouSureModal 
            handleNo={toggleWantDeletePlan} 
            handleYes={handleDeletePlan} 
            buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")}
            buttonYesValue={formatLang(userLangID, "Odstranit", "Delete")}
            titleValue={formatLang(userLangID, "Chcete odstranit tento plán?", "Want to delete this plan?")}
          />
        )}

        {wantNewCategory && (
          <NewBudgetCatModalMUI
            handleClose={toggleWantNewCat}
            isOpen={wantNewCategory}
            budgetCategories={budgetData.budgetCategories}
            addCategory={addCategoryToBudget}
          />
        )}

        <div className="flex items-center justify-between mb-10">

          <Link to="/dashboard/planner">
            <IconGoBack className="icon" />
          </Link>

          <IconDelete className="icon text-red-500 text-4xl" onClick={toggleWantDeletePlan}/>
        </div>

        <SectionTitle 
          value={`${getMonthName(budgetData.year, budgetData.month, userLangID)} (${budgetData.year})`}
          wantInfo={ budgetData.isFinished ? true : false }
          infoValue={formatLang(userLangID, hints.hintFinishedPlanCS, hints.hintFinishedPlanEN)} 
        />

        { budgetData.isFinished && 
          <p className="text-red-400 font-semibold mb-6">{formatLang(userLangID, "Tento rozpočet je uzavřený", "This budget is finished")}</p> 
        }

        <div className="mb-10">

          <div className="flex items-center gap-4 mb-2">
            <p className="font-semibold">{formatLang(userLangID, "Naplánovaná útrata:", "Planned spending:")}</p>
            <p>{formatCurrency(budgetData.plannedPrice, userCurrency)}</p>
          </div>

          <div className="flex items-center gap-4 ">
            <p className="font-semibold">{formatLang(userLangID, "Skutečná útrata:", "Actual spending:")}</p>
            <p>{formatCurrency(budgetData.spentPrice, userCurrency)}</p>
          </div> 
          
        </div>

        <div className="flex items-center justify-between mb-10">
          <h3 className="font-semibold">{formatLang(userLangID, "Podle kategorií", "By category")}</h3>
          { budgetData.isFinished || (
            <Tooltip title={formatLang(userLangID, "Přidat kategorii do rozpočtu", "Add category to budget")}>
              <IconButton color="primary" size="large" onClick={toggleWantNewCat}>
                <IconAdd/>
              </IconButton>
            </Tooltip>
          )}
        </div>

        { budgetData.budgetCategories.length === 0 

          ? <p className="text-center">
              {formatLang(userLangID, "Tento plán nemá zatím žádné kategorie", "This budget has no categories yet")}
            </p>

          : (
            <Box pb={20}>
              {budgetData.budgetCategories.map(x => {

                const icon = categoryIcons.find(i => i.id === x.categoryID.iconID)?.iconJSX
                const dataSet = [
                  { label: "Plán", value: x.price },
                  { label: "Skutečnost", value: x.spent },
                ]
                const percentage = x.price > 0 ? (x.spent / x.price) * 100 : 0

                return(
                  <Accordion sx={{ mb: 1 }} key={x._id}>
                    <AccordionSummary
                      expandIcon={<IconArrowDown />}
                    >
                      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Box display="flex" alignItems="center" gap={1}>
                          <span>{icon}</span>
                          <Typography component="span">{x.categoryID.name}</Typography>
                        </Box>
                        <Typography 
                          mr={2} 
                          component="span"
                          fontWeight={600}
                          color={percentage < 80 ? "success" : percentage < 100 ? "warning" : percentage >= 100 ? "error" : "primary"}
                        >
                          {percentage !== 0 ? percentage.toFixed(1) : percentage.toFixed(0)}%
                        </Typography>
                      </Box>
                    </AccordionSummary>
                  
                    <AccordionDetails>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography component="span">
                          {formatLang(userLangID, "Naplánovaná útrata:", "Planned spending:")}
                        </Typography>
                        <Typography>{formatCurrency(x.price, userCurrency)}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography component="span">
                          {formatLang(userLangID, "Skutečná útrata:", "Actual spending:")}
                        </Typography>
                        <Typography>{formatCurrency(x.spent, userCurrency)}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography component="span">
                          {formatLang(userLangID, "Zbývá:", "Remaining:")}
                        </Typography>
                        <Typography>{formatCurrency((x.price - x.spent > 0 ? x.price - x.spent : 0), userCurrency)}</Typography>
                      </Box>

                      <Box sx={{ width: '100%', height: "auto" }}>
                        <BarChart
                            dataset={dataSet}
                            yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                            series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                            layout="horizontal"
                            height={200} 
                            grid={{ vertical: true, horizontal: true }}
                            sx={{ width: "95% !important", overflow: "visible !important" }}
                        />
                      </Box>

                      {!budgetData.isFinished &&
                        <Box>

                          <Tooltip title={formatLang(userLangID, "Editovat plánovanou částku", "Edit planned price")}>
                            <IconButton color="info" loading={loading} onClick={() => {
                              setWantDeleteCategory("")
                              setEditPrice(x._id)
                            }}>
                                <IconEdit/>
                            </IconButton>
                          </Tooltip>

                          <Tooltip title={formatLang(userLangID, "Smazat tuto kategorii z rozpočtu", "Delete this category from budget")}>
                            <IconButton color="error" loading={loading} onClick={() => {
                              setEditPrice("")
                              setWantDeleteCategory(x._id)
                            }}>
                                <IconDelete/>
                            </IconButton>
                          </Tooltip>

                        </Box>
                      }

                      {wantDeleteCategory === x._id && 
                        <Box p={2} bgcolor="#f5f5f5" borderRadius={2} boxShadow={2}>
                          <Typography variant="subtitle2" mb={1}>{formatLang(userLangID, "Opravdu chcete odstanit tuhle kategorii z rozpočtu?", "Do you really want to remove this category from the budget?")}</Typography>
                          <Button
                            variant="contained"
                            color="success"
                            loading={loading}
                            size="small"
                            sx={{ mr: 2 }}
                            onClick={() => deleteCatFromBudget(x._id)}
                          >
                            {formatLang(userLangID, "Ano", "Yes")}
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            loading={loading}
                            onClick={() => setWantDeleteCategory("")}
                          >
                            {formatLang(userLangID, "Ne", "No")}
                          </Button>
                        </Box>
                      }

                      {editPrice === x._id && (
                        <EditBudgetPriceModal 
                          isOpen={editPrice === x._id} 
                          handleClose={() => setEditPrice("")}
                          value={budgetData.plannedPrice}
                          catID={x._id}
                          handleChangePrice={handleChangePrice}
                          loading={loading}
                        />
                      )}

                    </AccordionDetails>
                  </Accordion>
                )
              })}

            </Box>
          )
        }

  </div>
)}

export default OneBudgetPreview
