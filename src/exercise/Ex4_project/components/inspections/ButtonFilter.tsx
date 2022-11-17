import React, { useState } from "react";
import styled from "styled-components";
interface props {
  name: string;
  options: Array<any>;
  getOption: any;
  selectValueOption: any;
}
const ButtonFilter: React.FC<props> = ({
  name,
  options,
  selectValueOption,
  getOption,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClickButton = () => {
    setShowMenu(!showMenu);
    getOption();
  };

  const onItemClick = (option: any) => {
    selectValueOption(option);
    if (name === "Company") {
      setShowMenu(false);
    }
  };
  return (
    <ButtonContainer>
      <DropdownButton onClick={() => handleClickButton()}>
        {name}
      </DropdownButton>
      <DropdownContainer>
        {showMenu && (
          <>
            <DropdownMenu>
              {options?.map((option, i) => (
                <DropdownItem
                  key={option?.node?.id}
                  onClick={() => onItemClick(option?.node)}
                >
                  {option?.node?.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </>
        )}
      </DropdownContainer>
    </ButtonContainer>
  );
};

export default ButtonFilter;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const DropdownButton = styled.div`
  height: 20px;
  width: 100px;
  padding: 20px;
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
