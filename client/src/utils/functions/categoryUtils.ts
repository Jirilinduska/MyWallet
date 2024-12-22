import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../config/globals"
import { ICategory } from "../interfaces/interfaces"

export const getCategoryNames = (pageID: string | null, incomeCats: ICategory[], expenseCats: ICategory[], fromData: any[] ) => {
    
    if(!pageID) return
    
    if(pageID === PAGE_ID_INCOME) {
        return incomeCats
            .filter(cat => fromData.some(x => x.category === cat._id))
            .map(cat => cat.name)
    } else if(pageID === PAGE_ID_TRANSACTIONS) {
        return expenseCats
            .filter(cat => fromData.some(x => x.category === cat._id))
            .map(cat => cat.name)
    }
    return []
}