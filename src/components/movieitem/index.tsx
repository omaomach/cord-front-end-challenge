import React from "react";
import styled from "styled-components";
import { Movie } from "../../types/movies";

export default function MovieItem({
  title,
  release_date,
  overview,
  vote_average,
  genre_names,
  poster_path,
}: Movie) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Release date unknown";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <MovieItemWrapper>
      <LeftCont>
        <PosterImage
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={`${title} poster`}
        />
      </LeftCont>
      <RightCont>
        <TopRow>
          <Title>{title || "Untitled"}</Title>
          {vote_average !== undefined && (
            <Rating>{vote_average.toFixed(1)}</Rating>
          )}
        </TopRow>
        <Genres>{genre_names?.join(", ") || "Genres unknown"}</Genres>
        <Overview>{overview || "No overview available"}</Overview>
        <ReleaseDate>{formatDate(release_date)}</ReleaseDate>
      </RightCont>
    </MovieItemWrapper>
  );
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  display: flex;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LeftCont = styled.div`
  flex: 0 0 200px;
`;

const RightCont = styled.div`
  flex: 1;
  padding: 20px;
`;

const PosterImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const Rating = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;

  padding: 3px;
  background-color: #d9e021;
  border-radius: 3px;
`;

const Genres = styled.div`
  margin-bottom: 10px;
  font-style: italic;
  color: #d9e021;
`;

const ReleaseDate = styled.p`
  margin: 10px 0 5px 0;
  color: #d9e021;
  position: absolute;
  bottom: 0;
`;

const Overview = styled.p`
  margin: 0 0 10px 0;
  font-size: 0.9em;
  line-height: 1.4;
`;
