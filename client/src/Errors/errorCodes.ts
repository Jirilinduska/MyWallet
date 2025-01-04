


export const ErrorCodes: { [key: number]: { cs: string; en: string } } = {

    // * AUTORIZACE

    1000: {
        cs: "Špatný email",
        en: "Invalid email"
    }, 

    1001: {
        cs: "Nesprávné heslo",
        en: "Invalid password"
    }, 

    1002: {
        cs: "Aktuální heslo je nesprávné",
        en: "Current password is incorrect"
    },

    1003: {
        cs: "Zadejte prosím své aktuální heslo",
        en: "Please enter your current password"
    }, 

    1004: {
        cs: "Zadejte prosím nové heslo",
        en: "Please enter new password"
    },

    1005: {
        cs: "Nové heslo nesmí být stejné jako stávající",
        en: "New password must be different from current"
    },

    1006: {
        cs: "Tento účet je speciální, nelze ho smazat! :)",
        en: "This is a special account, it cannot be deleted! :)"
    },

    // * KATEGORIE

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