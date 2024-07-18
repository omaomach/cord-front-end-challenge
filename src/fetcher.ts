import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_API_AUTH_TOKEN = process.env.REACT_APP_TMDB_API_AUTH_TOKEN;


if (!TMDB_API_KEY || !TMDB_API_AUTH_TOKEN) {
  throw new Error('TMDB API key or Auth Token is missing');
}

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_API_AUTH_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});


export const searchMovies = async (query: string, year?: string) => {
  try {
    const params: any = { 
      query,
      api_key: TMDB_API_KEY,
    };
    if (year) {
      params.year = year;
    }
    const response = await tmdbAxios.get('/search/movie', { params });
    const genres = await getMovieGenres();
    response.data.results = response.data.results.map((movie: any) => ({
      ...movie,
      genre_names: movie.genre_ids.map((id: number) => genres?.[id] || 'Unknown').filter(Boolean)
    }));
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbAxios.get('/movie/popular', { 
      params: { 
        page,
        api_key: TMDB_API_KEY,
      } 
    });
    const genres = await getMovieGenres();
    response.data.results = response.data.results.map((movie: any) => ({
      ...movie,
      genre_names: movie.genre_ids.map((id: number) => genres?.[id] || 'Unknown').filter(Boolean)
    }));
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await tmdbAxios.get(`/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,  // Include API key in params
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};



let genreCache: { [key: number]: string } = {};

export const getMovieGenres = async () => {
  if (Object.keys(genreCache).length > 0) return genreCache;

  try {
    const response = await tmdbAxios.get('/genre/movie/list', {
      params: { api_key: TMDB_API_KEY }
    });
    genreCache = response.data.genres.reduce((acc: { [key: number]: string }, genre: { id: number, name: string }) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    return genreCache;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {}; 
  }
};