import { Link } from 'react-router-dom';
import error from '../images/gifs/Markus_Magnusson.gif' 

function NotFound() {
  return (
    <>
      <p>Сорямба</p>
      <img src={error} className="error-image"/>
      <Link to='/' className='home-link'>Вернуться</Link>
    </>
  )
}

export default NotFound;