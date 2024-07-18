import React, { useState } from "react";
import styled from "styled-components";

import Checkbox from "../checkbox";
import * as colors from "../../colors";

type ExpandableFiltersProps = {
  title: string;
  options: { id: string | number; name: string | number }[];
};

export default function ExpandableFilters({
  title,
  options,
}: ExpandableFiltersProps) {
  const [filtersShown, setFiltersShown] = useState(false);

  return (
    <FiltersWrapper>
      <FilterHeader onClick={() => setFiltersShown(!filtersShown)}>
        {title}
        <Arrow isOpen={filtersShown}>▼</Arrow>
      </FilterHeader>
      {filtersShown && (
        <FilterOptions>
          {options.map((option) => (
            <FilterOption key={option.id}>
              <Checkbox />
              <label htmlFor={`${title}-${option.id}`}>{option.name}</label>
            </FilterOption>
          ))}
        </FilterOptions>
      )}
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  margin-bottom: 15px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 0;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

const FilterOptions = styled.div`
  padding: 10px 0;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  label {
    margin-left: 10px;
    cursor: pointer;
  }
`;
