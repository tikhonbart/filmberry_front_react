//import '@/styles/globals.css'
import { PropsWithChildren, useContext } from "react";
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='content'>
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}

export default Layout;