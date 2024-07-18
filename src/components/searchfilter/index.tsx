import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import debounce from "lodash/debounce";

import ExpandableFilters from "../expandablefilters";
import SearchBar from "../searchbar";

type SearchFiltersProps = {
  genres: { id: number; name: string }[];
  ratings: { id: number; name: number }[];
  languages: { id: string | number; name: string }[];
  searchMovies: (keyword: string, year: string) => void;
};

type SearchFiltersContProps = {
  marginBottom?: boolean;
};

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  const debouncedSearch = useCallback(
    debounce((keyword: string, year: string) => {
      searchMovies(keyword, year);
    }, 300),
    [searchMovies]
  );

  useEffect(() => {
    debouncedSearch(keyword, year);
    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, year, debouncedSearch]);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <>
      <SearchFiltersCont className="search_inputs_cont" marginBottom>
        <SearchBar
          icon="search"
          placeholder="Search for movies"
          onChange={handleKeywordChange}
        />
        <SearchBar
          icon="calendar"
          placeholder="Year of release"
          onChange={handleYearChange}
        />
      </SearchFiltersCont>
      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        <ExpandableFilters title="Select genre(s)" options={genres} />
        <ExpandableFilters title="Select min. vote" options={ratings} />
        <ExpandableFilters title="Select language" options={languages} />
      </SearchFiltersCont>
    </>
  );
}

const SearchFiltersCont = styled.div<SearchFiltersContProps>`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}
`;

const CategoryTitle = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
`;
