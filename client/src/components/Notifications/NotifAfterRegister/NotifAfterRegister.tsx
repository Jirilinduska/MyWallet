
interface NotifAfterRegisterProps {
  messages: string[]
}

const NotifAfterRegister = ({ messages } : NotifAfterRegisterProps ) => {

  return (
    <div className="">

        { messages.map( (x, index) => <p key={index} className="mb-4 text-sm sm:text-base">{x}</p> ) }

    </div>
  )
}

export default NotifAfterRegister