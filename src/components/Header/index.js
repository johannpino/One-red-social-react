import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'

const Header = () => {
    return (
        <header className="root" >
        
        <Link to="/">
            <h1 className="logo" >One</h1>
            </Link>
        </header>
    );
};

export default Header;