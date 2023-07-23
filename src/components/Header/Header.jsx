import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './Header.scss';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
 

const Header = ({ variant = false }) => {
    const { user, logout } = useContext(AuthContext)

    return (
        <header className="header">
            <div className="header_container">
{                <img className='header_logo' src= {logo} alt="logo" />

}                <nav className='header_nav'>
                    <Link className="header_link" to="/" >Inicio</Link>
                    <Link className="header_link" to="/nosotros" >Nosotros</Link>
                    <Link className="header_link" to="/contacto" >Contacto</Link>
                    <p className='bienvenido'> Bienvenido: {user.email}</p><button className='btn btn-danger' onClick={logout}>Cerrar Sesión</button>

                </nav>
                    <CartWidget />
            </div>
        </header>
    )
}

export default Header