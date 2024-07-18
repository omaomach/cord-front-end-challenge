import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import * as colors from "../../colors";
import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

type Movie = any;
type Genre = any;

type DiscoverState = {
  keyword: string;
  year: string;
  results: Movie[];
  movieDetails: Movie | null;
  totalCount: number;
  genreOptions: { [key: number]: string };
  ratingOptions: { id: number; name: number }[];
  languageOptions: { id: string; name: string }[];
  isLoading: boolean;
  error: string | null;
};

export default function Discover() {
  const { movieId } = useParams<{ movieId?: string }>();
  const [state, setState] = useState<DiscoverState>({
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
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const preloadData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));
        const [popularMovies, genres] = await Promise.all([
          fetcher.getPopularMovies(),
          fetcher.getMovieGenres(),
        ]);
        console.log(genres);
        setState((prevState) => ({
          ...prevState,
          results: popularMovies.results,
          totalCount: popularMovies.total_results,
          genreOptions: genres,
          isLoading: false,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: "Failed to load initial data",
        }));
      }
    };

    preloadData();
  }, []);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (movieId) {
        try {
          setState((prevState) => ({
            ...prevState,
            isLoading: true,
            error: null,
          }));
          const details = await fetcher.getMovieDetails(parseInt(movieId, 10));
          setState((prevState) => ({
            ...prevState,
            movieDetails: details,
            isLoading: false,
          }));
        } catch (error) {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            error: "Failed to load movie details",
          }));
        }
      }
    };

    getMovieDetails();
  }, [movieId]);

  const searchMovies = useCallback(async (keyword: string, year: string) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
      const results = await fetcher.searchMovies(keyword, year);
      setState((prevState) => ({
        ...prevState,
        keyword,
        year,
        results: results.results,
        totalCount: results.total_results,
        isLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Failed to search movies",
      }));
    }
  }, []);

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
            {state.isLoading ? (
              <LoadingMessage>Loading...</LoadingMessage>
            ) : state.error ? (
              <ErrorMessage>{state.error}</ErrorMessage>
            ) : (
              <>
                <TotalCounter>{state.totalCount} movies</TotalCounter>
                <MovieList movies={state.results} />
              </>
            )}
          </MovieResults>
        </Layout>
      </ContentWrapper>
    </DiscoverWrapper>
  );
}

const DiscoverWrapper = styled.div`
  background-color: ${colors.lightBackground};
  min-height: 100vh;
  padding-top: 30px;
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

const LoadingMessage = styled.div`
  font-size: 18px;
  color: ${colors.fontColor};
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
`;
