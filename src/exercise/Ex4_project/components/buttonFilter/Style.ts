import styled from "styled-components";

export const ButtonContainer = styled.div`
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

export const DropdownButton = styled.div`
  height: 30px;
  width: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const DropdownContainer = styled.div`
  text-align: left;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 5px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
  max-height: 150px;
  background-color: #fff;
  z-index: 100;
  padding: 20px;
`;
export const DropdownItem = styled.div`
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #9fc3f870;
  }
`;
export const DropdownItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-top: 8px;
`;
