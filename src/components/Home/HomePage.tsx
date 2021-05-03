import React, { Fragment, useEffect } from "react";
import { useMovieContext } from '../../context/MovieContext';
import { Card } from '../Card/Card';
import { topRatedUrls } from "../../lib/urlHelper";
import '../SearchPage/SearchPage.css';
import '../LoadingCircle.css';
import { NavBar } from "../Navigation/NavBar";

export const HomePage = () => {

    const { state, movieTvDispatch, fetchData } = useMovieContext();

    const title = state.toggleTab === 'tvseries' ? 'TV shows' : 'movies';

    useEffect(() => {
        movieTvDispatch({
            type: 'INPUT_SEARCH',
            search: ''
        });
    }, []);

    return (
        <Fragment>
            <NavBar />
            <div className="movietv-container">

                {state.isLoading ?
                    <div className='loading-circle large' />
                    :
                    null
                }
                {state.errorMessage ?
                    <p style={{ color: 'red' }} className="count">{state.errorMessage}</p>
                    :
                    <p className="count">Top <b>{state.topMoviesTV?.length}</b> {title}</p>
                }

                <div className="movietv-list">
                    {state.toggleTab === 'movies' ?
                        <>
                            {state.topMoviesTV?.slice(0, 10).map(ratedMovie => {
                                return <Card key={ratedMovie.id}
                                    id={ratedMovie.id}
                                    name={ratedMovie.original_title}
                                    poster={ratedMovie.poster_path}
                                    year={ratedMovie.release_date?.substring(0, 4)} />
                            })}
                        </>
                        : state.toggleTab === 'tvseries' ?
                            <>
                                {state.topMoviesTV?.slice(0, 10).map(ratedTV => {
                                    return <Card key={ratedTV.id}
                                        id={ratedTV.id}
                                        name={ratedTV.name}
                                        poster={ratedTV.poster_path}
                                        year={ratedTV.first_air_date?.substring(0, 4)} />
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