import { Link } from "react-router-dom"


// TODO - Upravit UI

const EmailConfirmed = () => {
  return (
    <section className="h-screen flex items-center justify-center">

        <div className="flex flex-col items-center justify-center gap-10 rounded-lg shadow-xl w-[90%] h-[90%]">

            {/* Icon */}
            <div className="">
              <img src="/images/utils/email_confirmed.png" alt="email_confirmed" className="" />
            </div>

            <p className="">Your email adress has been sucestufly confirmed.</p>

            <Link to="/" className="button-green">Back to homepage</Link>

        </div>

    </section>
  )
}

export default EmailConfirmed