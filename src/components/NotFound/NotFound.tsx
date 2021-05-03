import React from 'react'
import { Link} from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {

    return (
        <section className="nf-container">
            <h1 className='err-code'>404</h1>
            <p className='err-desc'>Page not found</p>
            <p className='err-msg'>Opps! Looks like this page doesn't exist</p>
            <Link className='err-link' to='/'><a >Go to the front page &rarr;</a></Link>
        </section>
    );
}