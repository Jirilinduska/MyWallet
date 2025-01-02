

interface ProfileItemProps {
    value: string
    title: string
    handleClick: () => {}
}

const ProfileItem = ({ value, title, handleClick } : ProfileItemProps ) => {
  return (
    <div className="text-white">

        <span className="text-sm font-medium">{title}</span>

        <div className="flex items-center justify-between">
            <p className="">{value}</p>
            <span onClick={handleClick} className="underline text-red-500 text-xs cursor-pointer">Change</span>
        </div>
    </div>
  )
}

export default ProfileItem