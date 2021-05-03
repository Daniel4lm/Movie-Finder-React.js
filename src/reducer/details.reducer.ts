
interface InitialStateType {
    loading: boolean;
    movie_tv: Object;
    errorMessage: string;
}

const initialState = {
    loading: true,
    movie_tv: {},
    errorMessage: null
};

const detailsReducer = (detailsState: InitialStateType, action: any) => {
    switch (action.type) {
        case "SEARCH_MOVIETV_REQUEST":
            return {
                ...detailsState,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIETV_SUCCESS":
            return {
                ...detailsState,
                loading: false,
                movie_tv: action.movietv
            };
        case "UPDATE_TRAILERS":
            return {
                ...detailsState,
                movie_tv: { ...detailsState.movie_tv, ...{ trailers: action.trailers } }
            }
        case "SEARCH_MOVIETV_FAILURE":
            return {
                ...detailsState,
                loading: false,
                errorMessage: action.error
            };
        default:
            return detailsState;
    }
};

export { detailsReducer, initialState };