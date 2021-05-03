import React, { Fragment } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { Card } from '../Card/Card';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import './SearchPage.css';
import '../LoadingCircle.css';
import { NavBar } from '../Navigation/NavBar';

export const SearchPage = () => {

    let location = useLocation();
    const history = useHistory();
    const { state } = useMovieContext();

    const title = location.pathname === '/movies' ? 'movies' : 'TV shows';

    if (state.errorMessage || !state.searchValue) {
        return <Redirect to="/" />;
    }

    return ( 
        <Fragment>
            <NavBar />
            <div className="movietv-container">

                {state.isLoading ?
                    <div className='loading-circle large' />
                    :
                    <p className="count">We found <b>{state.searchItems?.length}</b> {title}</p>
                }

                <div className="movietv-list">
                    {location.pathname === '/movies' ?
                        <>
                            {state.searchItems?.map(movie => {
                                return <Card key={movie.id}
                                    id={movie.id}
                                    name={movie.original_title}
                                    poster={movie.poster_path}
                                    year={movie.release_date?.substring(0, 4)} />
                            })}
                        </>
                        : location.pathname === '/tvseries' ?
                            <>
                                {state.searchItems?.map(tvshow => {
                                    return <Card key={tvshow.id}
                                        id={tvshow.id}
                                        name={tvshow.name}
                                        poster={tvshow.poster_path}
                                        year={tvshow.first_air_date?.substring(0, 4)} />
                                })}
                            </>
                            :
                            null
                    }
                </div>
            </div>
        </Fragment>
    );
}