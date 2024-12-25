


export const ErrorCodes: { [key: number]: { cs: string; en: string } } = {

    // AUTORIZACE
    1000: {
        cs: "Špatný email",
        en: "Invalid email"
    }, 

    1001: {
        cs: "Špatné heslo",
        en: "Invalid password"
    }, 

    // KATEGORIE
    2000: {
        cs: "Kategorie nelze smazat, protože jsou s ní spojené transakce",
        en: "Category cannot be deleted because there are transactions associated with it"        
    }, 

    2001: {
        cs: "Kategorie nelze smazat, protože jsou s ní spojené plány výdajů",
        en: "Category cannot be deleted because there are budget plans associated with it"
    },
    2002: {
        cs: "Kategorie s tímto názvem již existuje",
        en: "Category with this name already exists"
    }

}