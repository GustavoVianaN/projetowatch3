import '../navbar/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faClock } from '@fortawesome/free-solid-svg-icons';
import { RiUserShared2Fill } from "react-icons/ri";

const Navbar = ({ openSidebar }) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <FontAwesomeIcon icon={faBars} aria-hidden="true" />
            </div>
            <div className="navbar__left">
                <a href="/" className="active_link">Listagem De Filmes</a>
                <a href="/usuarios" className="active_link">Usuários</a>
                <a href="/incluirfilme" className="active_link">Incluir Filme (crud)</a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <FontAwesomeIcon icon={faSearch} />
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faClock} />
                </a>
                <a href="#">
                    <RiUserShared2Fill style={{fontSize: '30px', color: '#ee551a'}} icon={faBars} aria-hidden="true" />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
