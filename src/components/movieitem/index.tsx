import React from "react";
import styled from "styled-components";

type MovieItemProps = {
  title: string;
  releaseDate: string;
  overview: string;
};

export default function MovieItem({
  title,
  releaseDate,
  overview,
}: MovieItemProps) {
  return (
    <MovieItemWrapper>
      <LeftCont>
        {/* Placeholder for movie poster */}
        <PosterPlaceholder />
      </LeftCont>
      <RightCont>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
        <ReleaseDate>{releaseDate}</ReleaseDate>
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
  flex: 0 0 100px;
`;

const RightCont = styled.div`
  flex: 1;
  padding: 20px;
`;

const PosterPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background-color: #dbdbdb;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5em;
`;

const ReleaseDate = styled.p`
  margin: 0 0 10px 0;
  color: #666;
`;

const Overview = styled.p`
  margin: 0;
  font-size: 0.9em;
  line-height: 1.4;
`;
