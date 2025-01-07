
interface IProgressBarProps {
  stage: number
}

const ProgressBar: React.FC<IProgressBarProps> = ({ stage }) => {
  return (
    <div className="fixed bottom-10 left-0 flex items-center justify-center w-full">
      
      <div className="bg-black h-[10px] w-[50%] mx-auto relative">

      <span className={`${ 
        stage === 0 ? "w-0"     : 
        stage === 1 ? "w-[33%]" :
        stage === 2 ? "w-[66%]" :  
        stage === 3 ? "w-full" : "" } 
      bg-colorGreen h-full block transition-all duration-300 ease-out`}>
      </span>

      <p className="text-black absolute -top-2 left-[102%]">
        { stage === 0 && "0%" }
        { stage === 1 && "33%" }
        { stage === 2 && "66%" }
        { stage === 3 && "99%" }
      </p>

    </div>
  </div>
  )
}

export default ProgressBar