import React, { useState } from "react";
import styled from "styled-components";

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

type SearchBarProps = {
  icon: "search" | "calendar";
  placeholder: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  icon,
  placeholder,
  onChange,
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <SearchIconWrapper>
        <img src={icon === "search" ? SearchIcon : CalendarIcon} alt={icon} />
      </SearchIconWrapper>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: white;
  border: none;
  border-bottom: 2px solid ${colors.primaryColor};
  padding: 10px 15px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1em;
  background-color: transparent;
  color: #d9e021;
  font-weight: 600;

  ::placeholder {
    color: ${colors.primaryColor};
    font-weight: 300;
  }

  ::-ms-input-placeholder {
    color: ${colors.primaryColor};
    font-weight: 300;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
