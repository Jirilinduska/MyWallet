
import "../ButtonLoading/ButtonLoading.css"

const FullScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white bg-opacity-50">
      <div className="spinner">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  )
}

export default FullScreenLoader
