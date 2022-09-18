import { Link } from "react-router-dom"

const Maintenance = () => {
  return (
    <div className='container d-flex justify-content-center mt-5'>
        <h1>Under maintenance. Thank you for your patience. <Link to={"/"}>Go back to home page.</Link> </h1>
    </div>
  )
}

export default Maintenance