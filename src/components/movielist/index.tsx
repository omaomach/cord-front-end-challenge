import React from "react";
import styled from "styled-components";

import MovieItem from "../movieitem";

//types
import { Movie } from "../../types/movies";
import { Genre } from "../../types/movies";

type MovieListProps = {
  movies: Movie[];
  genres: Genre[];
};

export default function MovieList({ movies, genres }: MovieListProps) {
  // Dummy data
  const dummyMovies = [
    {
      id: 1,
      title: "Inception",
      releaseDate: "2010-07-16",
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    },
    {
      id: 2,
      title: "The Matrix",
      releaseDate: "1999-03-31",
      overview:
        "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.",
    },
  ];

  return (
    <MoviesWrapper>
      {dummyMovies.map((movie) => (
        <MovieItem
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
        />
      ))}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
`;
