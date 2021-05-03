
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';
const { REACT_APP_MOVIE_DB_API_KEY } = process.env;

const topRatedUrls: any = {
    'movies': `${MOVIE_DB_BASE_URL}/movie/top_rated?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`,
    'tvseries': `${MOVIE_DB_BASE_URL}/tv/top_rated?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
}

const searchUrls: any = {
    'movies': `${MOVIE_DB_BASE_URL}/search/movie?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`,
    'tvseries': `${MOVIE_DB_BASE_URL}/search/tv?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
}

const detailsUrls: any = {
    'movies': `${MOVIE_DB_BASE_URL}/movie/{movie_id}?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`,
    'tvseries': `${MOVIE_DB_BASE_URL}/tv/{tv_id}?api_key=${REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
}

export { topRatedUrls, searchUrls, detailsUrls };