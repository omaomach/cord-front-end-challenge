import React from "react";
import styled, { css } from "styled-components";

import * as colors from "../../colors";
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
  const [keyword, setKeyword] = React.useState("");
  const [year, setYear] = React.useState("");

  React.useEffect(() => {
    searchMovies(keyword, year);
  }, [keyword, year, searchMovies]);

  return (
    <>
      <SearchFiltersCont className="search_inputs_cont" marginBottom>
        <SearchBar
          icon="search"
          placeholder="Search for movies"
          onChange={setKeyword}
        />
        <SearchBar
          icon="calendar"
          placeholder="Year of release"
          onChange={setYear}
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
