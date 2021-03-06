import React, { useContext } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { GrBasket } from 'react-icons/gr'
import { Link } from 'react-router-dom'

import { DataContext } from './DataContext'

function Header() {

    const { login, username } = useContext(DataContext)

    return (
        <header className="header">
            <Link to="/"><h1 className="header__h1">e-commerce</h1></Link>

            <nav className="header__nav">
                <Link to="/cart"><GrBasket /> Koszyk</Link>
                
                {(login && username==='admin') ? 

                <Link to="/admin"><FaUserAlt /> {username}</Link> : 

                login ? 

                <Link to="/user"><FaUserAlt /> {username}</Link> : 

                <Link to="/login"><FaUserAlt /> Zaloguj</Link>}
            </nav>

        </header>
    )
}

export default Header
