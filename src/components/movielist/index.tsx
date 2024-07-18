import React from "react";
import styled from "styled-components";
import MovieItem from "../movieitem";
import { Movie } from "../../types/movies";

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  console.log(movies);
  return (
    <MoviesWrapper>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
`;
