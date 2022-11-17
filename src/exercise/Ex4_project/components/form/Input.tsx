import React, { memo } from "react";
import styled from "styled-components";

interface props {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  register: any;
  error: string | any;
  disable: boolean;
}
const Input: React.FC<props> = ({
  name,
  type,
  label,
  placeholder,
  error,
  disable,
  register,
}) => {
  return (
    <div>
      <InputContainer>
        {label && <label className={error && "invalid"}>{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          className={`${error && "invalid"}`}
          disabled={disable}
          {...register}
        />
        {error && <span>{error}</span>}
      </InputContainer>
    </div>
  );
};
export default memo(Input);
const InputContainer = styled.div`
  margin: 0 auto;
  width: 50%;
  label {
    color: #aeb8cc;
    font-size: 18px;
    padding: 5px 10px;
    float: left;
    font-weight: 700;
    width: 100%;

    &.invalid {
      color: red;
    }
  }

  input {
    padding: 10px 20px;
    line-height: 24px;
    font-size: 16px;
    border: 0.5px solid #719dc1;
    border-radius: 3px;
    width: 100%;

    &:active,
    &:focus {
      outline: none;
    }
  }

  input.invalid {
    border: 0.5px solid red;
  }

  span {
    font-size: 12px;
    color: red;
    height: 24px;
    margin-left: 10px;
  }
`;
