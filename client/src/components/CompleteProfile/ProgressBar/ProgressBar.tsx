import { IProgressBar } from "../../../utils/interfaces/interfaces"


const ProgressBar: React.FC<IProgressBar> = ({ stage }) => {
  return (
    <div className="bg-white h-[10px] w-[50%] mx-auto relative">

    <span className={`${ 
        stage === 0 ? "w-0"     : 
        stage === 1 ? "w-[33%]" :
        stage === 2 ? "w-[66%]" :  
        stage === 3 ? "w-full" : "" } 
    bg-colorGreen h-full block transition-all duration-300 ease-out`}>
    </span>

    <p className="text-white absolute top-1/2 -translate-y-1/2 -right-10">
        { stage === 0 && "0%" }
        { stage === 1 && "33%" }
        { stage === 2 && "66%" }
        { stage === 3 && "99%" }
    </p>

</div>
  )
}

export default ProgressBar