import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { routes } from './routes/routes'
import RenderRoutes from './routes/helper';

import { Helmet, HelmetProvider } from "react-helmet-async";

import './Home.css';
import Footer from './components/Footer/Footer';

function Home() {

  return (
    <Router>
      <HelmetProvider>
        <div>
          <Helmet>
            <html lang="en" />
            <title>Movie Finder App</title>
            <link rel="icon" href="./favicon.svg" />
          </Helmet>
          <div className='nav-home'>
            <Link to='/'>
              <i className="fas fa-film app-logo"></i>
            </Link>
            <span className='nav-title'>Movie Finder App</span>
          </div>

          <RenderRoutes routes={routes} />
          <Footer />
        </div>
      </HelmetProvider>
    </Router >
  );
}

export default Home;
