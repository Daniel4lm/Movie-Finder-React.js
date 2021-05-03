import React from 'react'
import { Link } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import './Card.css';
import nImage from './not-a-Img.svg';

interface CardType {
    id: number;
    name: string;
    poster: string;
    year: string;
}

export const Card = ({ id, name, poster, year }: CardType) => {

    const { state } = useMovieContext();

    return (
        <Link to={state.toggleTab === 'movies' ? `/movies/${id}` : `/tvseries/${id}`} className='link'>
            <div className="card">
                <div className='cover'>(<b>{year}</b>)</div>
                {poster !== null ?
                    <img className='card-image' src={poster} alt='Movie' />
                    :
                    <div className="n-p"><img src={nImage} alt='No image' /></div>
                }
                <div className='card-title'><span>{name}</span></div>
            </div>
        </Link>
    );
}

