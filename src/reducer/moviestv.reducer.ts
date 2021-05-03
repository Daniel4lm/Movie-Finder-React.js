import { InitialStateType } from "../context/MovieContext";

const ACTION_TYPE: any = {
    TAB_TOGGLE: 'TAB_TOGGLE',
    INPUT_SEARCH: 'INPUT_SEARCH',
    SEARCH_TOP_MOVIETV: 'SEARCH_TOP_MOVIETV',
    SEARCH_MOVIETV_ITEMS: 'SEARCH_MOVIETV_ITEMS',
    SEARCH_MOVIESTV_REQUEST: 'SEARCH_MOVIESTV_REQUEST',
    UPDATE_PICTURE_URLS: 'UPDATE_PICTURE_URLS',
    FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE'
}

const MoviesReducer = (state: InitialStateType, action: any) => {

    switch (action.type) {
        case ACTION_TYPE.TAB_TOGGLE:
            return {
                ...state,
                toggleTab: action.name,
            };
        case ACTION_TYPE.INPUT_SEARCH:
            return {
                ...state,
                searchValue: action.search,
            };
        case ACTION_TYPE.SEARCH_MOVIESTV_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        case ACTION_TYPE.SEARCH_TOP_MOVIETV:
            return {
                ...state,
                isLoading: false,
                topMoviesTV: action.top_movies,
            };
        case ACTION_TYPE.SEARCH_MOVIETV_ITEMS:
            return {
                ...state,
                isLoading: false,
                searchItems: action.movies,
            };
        case ACTION_TYPE.UPDATE_PICTURE_URLS:
            return {
                ...state,
                topMoviesTV: action.movie_update
            }
        case ACTION_TYPE.FETCH_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.error,
            };
        
        default:
            return state;
    }
};

export { MoviesReducer, ACTION_TYPE };