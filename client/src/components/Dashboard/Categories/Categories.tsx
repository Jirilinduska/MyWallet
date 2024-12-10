import { useEffect, useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import GridCategories from "../../UI/GridCategories/GridCategories"
import NotifError from "../../Notifications/NofitError/NotifError"
import NotifSuccess from "../../Notifications/NotifSuccess/NotifSuccess"

const Categories = () => {

    const { userLangID, refreshUserData } = useUserContext()
    const { categoriesIncome,categoriesTransactions, refreshCategories } = useCategoriesContext()

    const [notifs, setNotifs] = useState({
        err: "",
        succ: ""
    })

    const handleSetNotif = (key: "err" | "succ", msg: string) => {
        setNotifs({...notifs, [key]: msg})
    }

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

    useEffect(() => {
        if(!categoriesIncome || !categoriesTransactions) refreshCategories()
    }, [] )

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        <h3 className="font-bold text-lg mb-10">{ userLangID === LANG_CZECH ? "Kategorie" : "Categories" }</h3>

        <GridCategories
            categories={categoriesIncome}
            langID={userLangID}
            titleCS="Kategorie příjmů"
            titleEN="Income categories"
            categoryType={CATEGORY_ID_INCOME}
            handleSetNotif={handleSetNotif}
        />

        <GridCategories
            categories={categoriesTransactions}
            langID={userLangID}
            titleCS="Kategorie výdajů"
            titleEN="Expense categories"
            categoryType={CATEGORY_ID_TRANSACTION}
            handleSetNotif={handleSetNotif}
        />

        <NotifSuccess message={notifs.succ} onClose={ () => setNotifs({...notifs, succ: ""}) }/>

        <NotifError message={notifs.err} onClose={ () => setNotifs({...notifs, err: ""}) }/>
    </div>
  )
}

export default Categories