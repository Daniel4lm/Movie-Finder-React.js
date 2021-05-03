import React, { createContext, useContext, FC, useReducer, useCallback } from 'react';
import { MoviesReducer } from "../reducer/moviestv.reducer";

export interface InitialStateType {
    toggleTab: string;
    searchValue: string;
    topMoviesTV: Array<any>;
    searchItems: Array<any>;
    selectedID: number;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState = {
    toggleTab: 'tvseries',
    searchValue: '',
    topMoviesTV: [],
    searchItems: [],
    selectedID: 0,
    isLoading: false,
    errorMessage: null
}

const MovieContext = createContext<{
    state: InitialStateType;
    movieTvDispatch: React.Dispatch<any>;
    fetchData: Function;
}>({
    state: initialState,
    movieTvDispatch: () => null,
    fetchData: () => null
});

const useMovieContext = () => {
    return useContext(MovieContext);
}

const MovieProvider: FC = ({ children }) => {

    const [state, movieTvDispatch] = useReducer(MoviesReducer, initialState);

    const setPicturesUrls = (movieResults: Array<any>, width: number) => {

        return movieResults.map(movie_tv => {
            if (movie_tv.poster_path === null) {
                return movie_tv;
            }
            return {
                ...movie_tv,
                backdrop_path: `https://image.tmdb.org/t/p/original${movie_tv.backdrop_path}`,
                poster_path: `https://image.tmdb.org/t/p/w${width}${movie_tv.poster_path}`
            }
        });
    }

    const dispatchFunc = (ACTION_TYPE: string, fetchData: any) => {
        if (ACTION_TYPE === 'SEARCH_TOP_MOVIETV') {
            movieTvDispatch({
                type: ACTION_TYPE,
                top_movies: setPicturesUrls(fetchData.results, 200) || []
            });
        } else if (ACTION_TYPE === 'SEARCH_MOVIETV_ITEMS') {
            movieTvDispatch({
                type: ACTION_TYPE,
                movies: setPicturesUrls(fetchData.results, 200) || []
            });
        }
    }

    const fetchData = useCallback(async (url: string, actionName: string, query?: string) => {

        movieTvDispatch({ type: 'SEARCH_MOVIESTV_REQUEST' });

        try {
            const response = await fetch(query ? `${url}&query=${state.searchValue}` : url);
            const fetchData = await response.json();

            dispatchFunc(actionName, fetchData);

        } catch (error) {
            movieTvDispatch({ type: 'FETCH_DATA_FAILURE', error: error.message || error.statusText });
        }
    }, [state.searchValue]);

    return (
        <MovieContext.Provider value={{ state, movieTvDispatch, fetchData }} >
            { children}
        </MovieContext.Provider>
    );
}

export { MovieContext, useMovieContext, MovieProvider };