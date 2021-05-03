import './Footer.css';

const Footer = () => {

    return (
        <footer className='footer'>
            <span>Copyright © 2021 - </span>
            <span className='pow'>
                <a
                    href="https://reactjs.org/"
                    target="_blank"
                >
                    <p>Powered by React.js</p>
                </a>
                <span>&</span>
                <a href="https://www.themoviedb.org/"
                    target="_blank"
                >
                    <p>TMDB.org</p>
                </a>
            </span>
            
        </footer>
    );
}

export default Footer;