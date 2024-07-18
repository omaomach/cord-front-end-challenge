import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'de52bda19802ed8258a65fea8a041cd7';
const TMDB_API_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTUyYmRhMTk4MDJlZDgyNThhNjVmZWE4YTA0MWNkNyIsIm5iZiI6MTcyMTMxMzU5NS41MDQ2MjYsInN1YiI6IjY2OTkyOGE4NmNjOWI1YmNkNzJjNzg4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wW4xnbL7pitUtFzZo41V0S3AFmej-DsxIHMdz1if2eE';

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
      genre_names: movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)
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
      genre_names: movie.genre_ids.map((id: number) => genres[id]).filter(Boolean)
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



let genreCache: { [key: number]: string } | null = null;

export const getMovieGenres = async () => {
  if (genreCache) return genreCache;

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
    throw error;
  }
};