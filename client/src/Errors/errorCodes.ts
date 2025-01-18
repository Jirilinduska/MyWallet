
export const ErrorCodes: { [key: number]: { cs: string; en: string } } = {

    // * OTHER
    5000: {
        cs: "Něco se pokazilo, zkuste to prosím později",
        en: "Something went wrong, please try again later"
    },  

    5001: {
        cs: "Success",
        en: "Success"
    },

    // * AUTORIZACE

    1000: {
        cs: "Účet s tímto e-mailem nebyl nalezen",
        en: "Account with this email not found"
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

    1007: {
        cs: "Prosím zadejte e-mail" ,
        en: "Please enter your email"
    },

    1008: {
        cs: "Prosím zadejte uživatelské jméno" ,
        en: "Please enter your username"
    },

    1009: {
        cs: "Účet s tímto emailem již existuje" ,
        en: "An account with this email already exists"
    },

    1010:{
        cs: "Uživatel nenalezen",
        en: "User not found"
    },

    1011: {
        cs: "Heslo musí mít minimálně 8 znaků",
        en: "Password must be at least 8 characters long"
    },

    1012: {
        cs: "Neplatný nebo vypršelý token",
        en: "Invalid or expired token"
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
    },

    2003: {
        cs: "Kategorie nenalezena",
        en: "Category not found"
    }
}