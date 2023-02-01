import './style.css';
import { Link } from 'react-router-dom';
const Navbar = ()=>{
    return (
    <nav className="main-nav">
        <header>
            Módulo Academico
        </header>
        <ul className="nav-links">
            <Link className="nav-item" to="/">
                <li>Alunos</li>
            </Link>
        </ul>
    </nav>
);
};
export default Navbar;