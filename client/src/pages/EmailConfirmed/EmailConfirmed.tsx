import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"

const EmailConfirmed = () => {

  const { userLangID } = useUserContext()

  return (
    <section className="h-screen flex items-center justify-center flex-col">

            <div className="w-[200px] h-[200px] mb-10">
              <img src="/images/utils/email_confirmed.png" alt="email_confirmed" className="" />
            </div>

            <p className="mb-10">
              {formatLang(userLangID, "Vaše e-mailová adresa byla úspěšně potvrzena", "Your email adress has been sucestufly confirmed")}
            </p>

            <Link to="/" className="button-green">{formatLang(userLangID, "Domů", "Home")}</Link>

    </section>
  )
}

export default EmailConfirmed