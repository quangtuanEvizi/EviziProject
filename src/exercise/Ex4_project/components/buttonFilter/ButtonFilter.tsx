import React, { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  ButtonContainer,
  Checkbox,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownItemContainer,
  DropdownMenu,
} from "./Style";
interface props {
  options: Array<any>;
  selectValueOption: any;
  multiSelect: boolean;
  selectOption: any[];
  handleRemoveFilter:any;
  
}
const ButtonFilter: React.FC<props> = ({
  options,
  selectValueOption,
  multiSelect,
  selectOption,
  handleRemoveFilter
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClickButton = () => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: any) => {
    selectValueOption(option);
  };
  const handleChange = (e: any, option: any) => {
    if (e.target.checked) {
      selectValueOption(option);
    }else{
      handleRemoveFilter(option.type, option.value)
    }
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
                      {multiSelect && (
                        <Checkbox
                          type="checkbox"
                          checked={selectOption?.includes(option?.value) || false}
                          onChange={(e) => handleChange(e, option)}
                        />
                      )}
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
