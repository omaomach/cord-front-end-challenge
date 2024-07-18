import React from "react";
import styled from "styled-components";

import MovieItem from "../movieitem";

//types
import { Movie } from "../../types/movies";
import { Genre } from "../../types/movies";

// Add types for the props of 'MovieList'
type MovieListProps = {
  // movies, genres
  movies: Movie[];
  genres: Genre[];
};

export default function MovieList({}: MovieListProps) {
  return (
    <MoviesWrapper>
      {/* Finish the MovieItem component and use it here to display the movie results */}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
`;
