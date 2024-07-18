import React, { useState, useRef } from "react";
import styled from "styled-components";

import Checkbox from "./checkbox";
import * as colors from "../../colors";
import { Option } from "../../types/movies";

type ExpandableFiltersProps = {
  title: string;
  options: Option[];
};

export default function ExpandableFilters({
  title,
  options,
}: ExpandableFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<
    Record<string | number, boolean>
  >({});
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (id: string | number, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: isChecked }));
  };

  return (
    <FiltersWrapper>
      <FilterHeader onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <ExpandIcon isOpen={isOpen}>{isOpen ? "−" : "+"}</ExpandIcon>
        {title}
      </FilterHeader>
      <FilterOptions
        ref={contentRef}
        style={
          isOpen ? { height: contentRef.current?.scrollHeight } : { height: 0 }
        }
      >
        {options.map((option) => (
          <FilterOption key={option.id}>
            <Checkbox
              id={`${title}-${option.id}`}
              checked={checkedItems[option.id] || false}
              onChange={(id, isChecked) =>
                handleCheckboxChange(option.id, isChecked)
              }
            />
            <FilterLabel htmlFor={`${title}-${option.id}`}>
              {option.name}
            </FilterLabel>
          </FilterOption>
        ))}
        {options.length === 0 && <FilterLabel>None</FilterLabel>}
      </FilterOptions>
    </FiltersWrapper>
  );
}
const FiltersWrapper = styled.div`
  margin-bottom: 15px;
`;

const FilterHeader = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 0;
  font-size: 1.1em;
`;

const ExpandIcon = styled.span<{ isOpen: boolean }>`
  margin-right: 8px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const FilterOptions = styled.div`
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const FilterOption = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FilterLabel = styled.label`
  margin-left: 10px;
  cursor: pointer;
  color: ${colors.fontColor};
`;
