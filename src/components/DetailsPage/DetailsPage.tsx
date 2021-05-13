import React, { useEffect, useReducer, useCallback } from 'react'
import { Redirect, useParams, useHistory, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { detailsReducer, initialState } from "../../reducer/details.reducer";
import { useMovieContext } from '../../context/MovieContext';
import { detailsUrls, trailersUrls } from "../../lib/urlHelper";
import './index.css';
import '../LoadingCircle.css';

const calculateDuration = (runtime: number) => {

    if (runtime < 60) {
        return `${runtime}min`;
    }

    const hours = Math.floor(runtime / 60).toFixed(0);
    const minutes = ((runtime / 60 - parseInt(hours)) * 60).toFixed(0);
    return `${hours}h ${minutes}min`;
}

export const DetailsPage = () => {

    const { id } = useParams<{ id: string }>();
    let location = useLocation();
    let history = useHistory();

    const { state, movieTvDispatch } = useMovieContext();
    const [detailsState, dispatch] = useReducer(detailsReducer, initialState);

    const basePath = location.pathname.match(/[^0-9 /]/g)?.join('');

    /* Setting poster and backdrop urls */
    const setPicturesUrls = (movietv: any, width: number) => {

        if (movietv.backdrop_path === null) {
            return movietv;
        }
        return {
            ...movietv,
            backdrop_path: `https://image.tmdb.org/t/p/original${movietv.backdrop_path}`,
        }
    }

    /* Fetch trailers */
    const getTrailers = async (id: string) => {
        const baseUrl: string = trailersUrls[basePath ? basePath : ''];
        const detailsUrl: string = baseUrl.replace(/{(movie|tv)(_id})/i, id);

        try {
            const response = await fetch(detailsUrl);
            const trailersData = await response.json();
            const trailers = trailersData?.results.map((trailer: any) => {
                if (trailer.type === 'Trailer') {
                    return {
                        url: ` https://www.youtube.com/watch?v=${trailer.key}`,
                        name: trailer.name
                    }
                }
            }).filter((trailerUrl: any) => trailerUrl !== undefined);

            dispatch({ type: 'UPDATE_TRAILERS', trailers: trailers || [] });
        } catch (error) {
            dispatch({ type: 'SEARCH_MOVIETV_FAILURE', error: error.message || error.statusText });
        }
    }

    const fetchMovie = useCallback(async (id: string) => {
        const baseUrl: string = detailsUrls[basePath ? basePath : ''];
        const detailsUrl: string = baseUrl.replace(/{(movie|tv)(_id})/i, id);

        dispatch({ type: 'SEARCH_MOVIETV_REQUEST' });

        try {
            const response = await fetch(detailsUrl);
            const movieData = await response.json();
            dispatch({ type: 'SEARCH_MOVIETV_SUCCESS', movietv: setPicturesUrls(movieData, 300) || {} });
            getTrailers(id);
        } catch (error) {
            dispatch({ type: 'SEARCH_MOVIETV_FAILURE', error: error.message || error.statusText });
            return <Redirect to="*" />;
        }
    }, [id]);

    useEffect(() => {

        movieTvDispatch({
            type: 'TAB_TOGGLE',
            name: basePath
        });

        fetchMovie(id);

    }, [id]);

    return (
        <div className='details-container'>
            <Helmet>
                <title>{basePath === 'movies' ? detailsState.movie_tv.title : detailsState.movie_tv.name}</title>
                <meta name="description" content="Details page" />
            </Helmet>
            { !state.isLoading ?
                <div className='details-content'>
                    <div className='back-track'>
                        <a className='back-link'
                            onClick={() => { history.goBack() }}
                        >
                            <i className="fas fa-chevron-left"></i><span>Back</span></a>
                        <hr></hr>
                    </div>

                    {detailsState.movie_tv.backdrop_path !== null &&
                        <img className='details-poster' src={detailsState.movie_tv.backdrop_path} alt='Poster' />}

                    <div className='product-movie'>

                        <span className='name'>
                            {basePath === 'movies' ? detailsState.movie_tv.title : detailsState.movie_tv.name}
                        </span>

                        <hr />

                        <span id="minigod">
                            <i className="fa fa-clock-o"></i>
                            {basePath === 'movies' ?
                                <span>{calculateDuration(detailsState.movie_tv.runtime)} | ({detailsState.movie_tv.release_date?.substring(0, 4)})</span>
                                :
                                <span>Episode: {detailsState.movie_tv.episode_run_time}min | ({detailsState.movie_tv.first_air_date?.substring(0, 4)})</span>
                            }
                        </span>

                        <hr />

                        <p className="desc">
                            {detailsState.movie_tv.overview}
                        </p>
                        <br></br>

                        <div className='trailers'>
                            <p><strong>Trailers: </strong></p>
                            {detailsState.movie_tv.trailers?.map((trailer: any) => {
                                return (
                                    <div key={trailer.name} className='trailer'>
                                        <i className="fab fa-youtube"></i>
                                        <a className='trailer-link' href={trailer.url} target="_blank" rel="noopener noreferrer">{trailer.name}</a>
                                    </div>

                                )
                            })}
                        </div>

                        <div className="genres">
                            <span><b>Genres </b></span>
                            {detailsState.movie_tv.genres?.map((genre: { id: number; name: string; }) => {
                                return <span className='genre' key={genre.id} >{genre.name}</span>
                            })}
                        </div>

                        <a className="rating" target="_blank" href={`https://www.imdb.com/title/${detailsState.movie_tv.imdb_id}`}>
                            <span >IMDb {detailsState.movie_tv.vote_average}/10</span>
                        </a>
                        <hr />

                        {detailsState.movie_tv.tagline?.length > 0 ?
                            <span className="tagline">
                                <span><b>Taglines: </b> <em>{detailsState.movie_tv.tagline}</em> </span>
                            </span>
                            :
                            null
                        }
                    </div>
                </div>
                :
                <div className='loading-circle large' />
            }
        </div>
    );
}
