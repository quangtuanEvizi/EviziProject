import React, { memo, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash"

interface props {
  name: string;
  label: string;
  placeholder: string;
  error: string | any;
  disable: boolean;
  options: Array<any>;
  pageInfo: any;
  onHandleInputClick: any;
  onHandleLoadMore: any;
  onChange: any;
  onHandelSearchInput: any;
  valueDisplay: string;
  setDisplay: any;
}

const Select: React.FC<props> = ({
  name,
  label,
  placeholder,
  error,
  disable,
  pageInfo,
  options,
  onHandleInputClick,
  onHandleLoadMore,
  onChange,
  onHandelSearchInput,
  valueDisplay,
  setDisplay,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleInputClick = (e: any) => {
    onHandleInputClick();
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: any) => {
    setDisplay(option?.name);
    setShowMenu(false);
    onChange(option?.id);
  };

  return (
    <SelectContainer>
      {label && <label className={error && "invalid"}>{label}</label>}
      <DropdownContainer>
        {disable ? (
          <DropdownInput>
            {valueDisplay ? valueDisplay : placeholder}
          </DropdownInput>
        ) : (
          <DropdownInput
            onClick={handleInputClick}
            className={` ${error && "invalid"}`}
          >
            {valueDisplay ? valueDisplay : placeholder}
          </DropdownInput>
        )}
        {showMenu && (
          <>
            <SearchBox>
              <SearchBoxInput
                placeholder="Search ..."
                onChange={
                  debounce((e) => onHandelSearchInput(e.target.value), 1000)
                }
              />
              <button
                onClick={onHandleLoadMore}
                disabled={pageInfo?.hasNextPage ? false : true}
              >
                Load more
              </button>
            </SearchBox>
            <DropdownMenu>
              {options?.map((option, i) => (
                <DropdownItem
                  key={option?.node?.id}
                  onClick={() => {
                    onItemClick(option?.node);
                  }}
                >
                  {option?.node?.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </>
        )}
      </DropdownContainer>
      {error && <span>{name} is required</span>}
    </SelectContainer>
  );
};

export default memo(Select);

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  label {
    color: #aeb8cc;
    font-size: 18px;
    padding: 5px 10px;
    float: left;
    font-weight: 700;
    &.invalid {
      color: red;
    }
  }
  span {
    font-size: 12px;
    color: red;
    height: 24px;
    margin-left: 10px;
  }
`;
const DropdownContainer = styled.div`
  text-align: left;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 5px;
  .invalid {
    border: 0.5px solid red;
  }
`;
const DropdownInput = styled.div`
  width: 100%;
  padding: 10px 20px;
  line-height: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  border-radius: 5px;
  border: none;
`;
const DropdownMenu = styled.div`
  position: absolute;
  transform: translateY(4px);
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
  max-height: 150px;
  background-color: #fff;
  z-index: 99;
`;
const DropdownItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9fc3f870;
  }
`;
const SearchBox = styled.div`
  padding: 5px;
  background-color: #eee;
  display: flex;
  button {
    background-color: RGB(193, 195, 197);
    color: rgb(223, 223, 223);
    font-size: 15px;
    margin: 0 5px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    &:hover {
      background-color: RGB(182, 183, 184);
      color: #fff;
    }
  }
`;
const SearchBoxInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
