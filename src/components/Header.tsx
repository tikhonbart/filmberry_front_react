import Link from 'next/link';
import { RiMovie2Line } from 'react-icons/ri';
import { useState } from 'react';
import { useTheme } from './ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
            <div className="logo">
                <Link href ='/'><RiMovie2Line/></Link>
            </div>
            <nav className="main-menu">
                <ul>
                    <li><Link href ='/'>Home</Link></li>
                    

                </ul>
            </nav>
            <div className="right-menu">
                <div id="dropdown">
                    <button onClick={toggleTheme}>Сменить тему</button>
                </div>
            </div>
        </header>
    )
}

export default Header;