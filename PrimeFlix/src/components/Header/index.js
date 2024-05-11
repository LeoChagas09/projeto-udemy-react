import { Link } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <>
        <Link className='logo' to="/">PrimeFlix</Link>
        <Link className='favoritos' to="/favoritos">Meus Filmes <FontAwesomeIcon icon={faFilm} /></Link>
      </>
    </header>
  );
}

export default Header;