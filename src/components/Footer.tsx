import { useTheme } from './ThemeContext';

const Footer = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
            <div className="footer-content">
                <div className="left-column">
                    <h2>FILMBERRY</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci, rem obcaecati voluptatibus et reprehenderit animi vero consequatur quam voluptates rerum, unde quia perspiciatis vitae quidem. Tempora magnam laudantium laboriosam.</p>
                </div>
                <div className="right-columns">
                    <div className="column">
                        <h3>Pages</h3>
                        <ul>
                            <li><a href="#">The most watched movies</a></li>
                            <li><a href="#">Top Rated Movies</a></li>
                            <li><a href="#">Movies</a></li>
                            <li><a href="#">Serials</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>Our social networks</h3>
                        <ul>
                            <li><a href="#">Telegram</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>For reference</h3>
                        <ul>
                            <li><a href="#">Telegram</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">WhatsApp</a></li>
                            <li><a href="#">Skype</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="centered-text">
                <p>Ⓒ Filmberry.com - 2023</p>
            </div>
        </footer>
    )
}

export default Footer