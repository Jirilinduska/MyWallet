const Category = require("../../../models/Category")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")

const deleteCategory = async(req,res) => {

    const { id } = req.params
    
    try {

        const transactions = await Transaction.find({ category: id })

        // TODO - Tohle ošetřit na FE
        // TODO - Při mazani categorii pokud existutují transakce, tak presmerovat na dashboard/categories/preview-category/6760b43337cfdfa6dea0c538/transactions, (přidat i /catID/overview...) kde se zobrazi všechny transakce pro tuto kategorii :)
        // TODO - Pokud jich bude mnoho, tak vytvořit komponentu "SHOW MORE" kde při kliknutí zobrazí dalších 10... 
        // TODO - Na fe vytvořit funkci handleErrorMSg - a přidat chybovy kod a překlad do daneho jazyka...
        // TODO - Ošetři na fe, pokud je kategori přiřazena k budgetu, tak vyhodit chybu a přesmerovat na daný budget?

        if (transactions.length > 0) return res.status(400).json({ errCode: 2000 })
        
        const budget = await Budget.findOne({
          "budgetCategories.categoryID": id
        })

        if (budget) return res.status(400).json({ errCode: 2001 })

        await Category.findByIdAndDelete(id)

        return res.status(200).json({ message: "Category deleted." })

    } catch (error) {
        console.log("deleteCategory() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { deleteCategory }