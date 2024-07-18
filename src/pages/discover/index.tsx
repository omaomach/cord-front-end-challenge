import React, { useState } from "react";
import styled from "styled-components";

import * as colors from "../../colors";
import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

export default function Discover() {
  const [state, setState] = useState({
    keyword: "",
    year: "",
    results: [],
    movieDetails: null,
    totalCount: 0,
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: 7.5 },
      { id: 8, name: 8 },
      { id: 8.5, name: 8.5 },
      { id: 9, name: 9 },
      { id: 9.5, name: 9.5 },
      { id: 10, name: 10 },
    ],
    languageOptions: [
      { id: "GR", name: "Greek" },
      { id: "EN", name: "English" },
      { id: "RU", name: "Russian" },
      { id: "PO", name: "Polish" },
    ],
  });

  // Write a function to preload the popular movies when page loads & get the movie genres

  // Write a function to get the movie details based on the movie id taken from the URL.

  const searchMovies = (keyword: string, year: string) => {
    console.log(`Search triggered with keyword: ${keyword}, year: ${year}`);
  };

  return (
    <DiscoverWrapper>
      <ContentWrapper>
        <MobileNavToggle></MobileNavToggle>
        <MobilePageTitle>Discover</MobilePageTitle>
        <Layout>
          <MovieFilters>
            <SearchFilters
              genres={state.genreOptions}
              ratings={state.ratingOptions}
              languages={state.languageOptions}
              searchMovies={searchMovies}
            />
          </MovieFilters>
          <MovieResults>
            <TotalCounter>{state.totalCount} movies</TotalCounter>
            <MovieList movies={state.results} genres={state.genreOptions} />
          </MovieResults>
        </Layout>
      </ContentWrapper>
    </DiscoverWrapper>
  );
}

const DiscoverWrapper = styled.div`
  background-color: ${colors.lightBackground};
  min-height: 100vh;
  padding-top: 80px; // Adjust based on your header height
`;

const MobileNavToggle = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 40px;

  @media (max-width: 1090px) {
    flex-direction: column;
  }
`;

const MovieResults = styled.div`
  flex-grow: 1;
`;

const MovieFilters = styled.div`
  width: 280px;
  flex-shrink: 0;

  @media (max-width: 1090px) {
    width: 100%;
  }
`;

const MobilePageTitle = styled.h1`
  font-size: 24px;
  font-weight: 900;
  color: ${colors.fontColor};
  margin-bottom: 20px;
`;

const TotalCounter = styled.div`
  font-weight: 900;
  margin-bottom: 20px;
  color: ${colors.fontColor};
`;
