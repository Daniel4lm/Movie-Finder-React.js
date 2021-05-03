import React, { useEffect, useRef } from 'react'
import { useMovieContext } from '../../context/MovieContext';
import { topRatedUrls, searchUrls } from "../../lib/urlHelper";
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css';

const WAIT_INTERVAL = 1000;

interface NavBarType {
    placeholder?: string | undefined;
}

export const NavBar = ({ placeholder = 'Search by name' }: NavBarType) => {

    const { state, movieTvDispatch, fetchData } = useMovieContext();
    let history = useHistory();

    const initialRender = useRef(true);

    const handleInput = (value: string) => {
        movieTvDispatch({
            type: 'INPUT_SEARCH',
            search: value
        })
    }

    const isSearchAble = () => {
        return state.searchValue && state.searchValue.length >= 3;
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            let timer: any;
            if (state.searchValue.length >= 3) {
                timer = setTimeout(() => {
                    fetchData(searchUrls[state.toggleTab], 'SEARCH_MOVIETV_ITEMS', state.searchValue);
                    if (state.toggleTab === 'movies') {
                        history.push("/movies");
                    } else {
                        history.push("/tvseries");
                    }
                }, WAIT_INTERVAL);
            } else {
                timer = setTimeout(() => {
                    history.push("/");
                }, WAIT_INTERVAL);
            }
            return () => { clearTimeout(timer); }
        }
    }, [state.searchValue]);

    useEffect(() => {

        if (isSearchAble()) {
            fetchData(searchUrls[state.toggleTab], 'SEARCH_MOVIETV_ITEMS', state.searchValue);
        } else {
            fetchData(topRatedUrls[state.toggleTab], 'SEARCH_TOP_MOVIETV');
        }

    }, [state.toggleTab]);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
    }

    return (
        <nav >
            <div className='nav-container' >
                <div className='nav-tabs'>
                    <Link to={isSearchAble() ? '/movies' : '/'}>
                        <button className={state.toggleTab === 'movies' ? 'select-tab toggle' : 'select-tab'}
                            onClick={() => {
                                movieTvDispatch({
                                    type: 'TAB_TOGGLE',
                                    name: 'movies'
                                })
                            }}
                        >
                            Movies</button>
                    </Link>
                    <Link to={isSearchAble() ? '/tvseries' : '/'}>
                        <button className={state.toggleTab === 'tvseries' ? 'select-tab toggle' : 'select-tab'}
                            onClick={() => {
                                movieTvDispatch({
                                    type: 'TAB_TOGGLE',
                                    name: 'tvseries'
                                })
                            }}
                        >
                            TV Shows</button>
                    </Link>
                </div>

                <form className='nav-form' onSubmit={submitHandler}>
                    <input
                        value={state.searchValue}
                        onChange={(e) => handleInput(e.target.value)}
                        type='text'
                        placeholder={placeholder}
                    />
                </form>
            </div>
        </nav>
    );
}