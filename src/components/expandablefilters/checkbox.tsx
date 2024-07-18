import React, { useState } from "react";
import styled from "styled-components";
import * as colors from "../../colors";

type CheckboxProps = {
  id: string | number;
  checked?: boolean;
  onChange?: (id: string | number, isChecked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked: externalChecked,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked =
    externalChecked !== undefined ? externalChecked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    if (externalChecked === undefined) {
      setInternalChecked(newChecked);
    }
    if (onChange) {
      onChange(id, newChecked);
    }
  };

  // Convert id to string to ensure it's always a valid HTML id
  const stringId = id.toString();

  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        id={stringId}
        checked={isChecked}
        onChange={handleChange}
      />
      <CheckboxLabel htmlFor={stringId} />
    </CheckboxWrapper>
  );
};
const CheckboxWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + label:after {
    content: "\u2714";
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:checked + label {
    background-color: ${colors.primaryColor};
    border-color: ${colors.primaryColor};
  }
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.fontColor};
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primaryColor};
  }
`;

export default Checkbox;
