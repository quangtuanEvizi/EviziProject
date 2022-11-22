import React, { useState } from "react";
import styled from "styled-components";
import useOnclickOutside from "react-cool-onclickoutside";

interface props {
  options: Array<any>;
  selectValueOption: any;
  multiSelect: boolean;
}
const ButtonFilter: React.FC<props> = ({
  options,
  selectValueOption,
  multiSelect,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClickButton = () => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: any) => {
    selectValueOption(option);
  };
  const closeMenu = (): void => setShowMenu(false);
  const ref = useOnclickOutside(() => closeMenu());
  return (
    <ButtonContainer ref={ref}>
      <DropdownButton onClick={() => handleClickButton()}>
        <img
          src="http://192.168.1.189:13030/8baa7a972d110d76aa3da3f62eb5dfe5.png"
          alt=""
        />
      </DropdownButton>
      <DropdownContainer>
        {showMenu && (
          <>
            <DropdownMenu>
              {options?.map((option, i) => {
                if (option.type) {
                  return (
                    <DropdownItemContainer key={i}>
                      {multiSelect && <Checkbox type="checkbox" />}
                      <DropdownItem onClick={() => onItemClick(option)}>
                        {option?.label}
                      </DropdownItem>
                    </DropdownItemContainer>
                  );
                } else {
                  return (
                    <DropdownItem
                      key={option?.node?.id}
                      onClick={() => onItemClick(option?.node)}
                    >
                      {option?.node?.name}
                    </DropdownItem>
                  );
                }
              })}
            </DropdownMenu>
          </>
        )}
      </DropdownContainer>
    </ButtonContainer>
  );
};

export default ButtonFilter;
const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 30px;
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
  height: 30px;
  width: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const DropdownContainer = styled.div`
  text-align: left;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
  max-height: 150px;
  background-color: #fff;
  z-index: 100;
  padding: 20px;
`;
const DropdownItem = styled.div`
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9fc3f870;
  }
`;
const DropdownItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-top: 8px;
`;
