

interface LoaderProps {
    wantFullSize: boolean
}

const Loader = ({ wantFullSize } : LoaderProps ) => {

  return (
    <div className={`${ wantFullSize ? "fixed top-0 left-0" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" } flex justify-center items-center h-screen w-full bg-opacity-50 bg-white `}>
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce transition-all"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    </div>
  )
}

export default Loader
  