/// <reference types="react-scripts" />


declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_TMDB_API_KEY: string;
    REACT_APP_TMDB_API_AUTH_TOKEN: string;
  }
}