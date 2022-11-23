import styled from "styled-components";

export const ListDependencies = styled.div`
  width: 100%;
  display: "flex";
  flex-direction: "row";
  flex-wrap: wrap;
`;
export const Dependency = styled.span`
  background-color: rgb(222, 233, 246);
  margin: 5px;
  padding: 10px 10px;
  border-radius: 20px;
  font-weight: 700;
  color: black;
`;
export const ButtonDeleteDependency = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 10px;
  background-color: rgb(35, 120, 222);
  border: none;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  &:hover {
    background-color: rgb(9, 90, 188);
  }
`;
