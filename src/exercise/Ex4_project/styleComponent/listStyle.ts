import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  overflow: auto;
  font-size: 16px;
  padding-top: 20px;
  background-color: rgb(244, 246, 248);
`;
export const HeaderList = styled.div`
  margin: 20px;
`;
export const HeaderLink = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    border-radius: 5px;
    font-weight: 700;
    font-size: 21px;
    color: #fff;
    padding: 10px 20px;
    background-color: rgb(75, 151, 242);
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  a:hover {
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  }
`;
export const HeaderSearch = styled.div`
  float: right;
`;
export const InputSearch = styled.input`
  border: none;
  margin: 8px 5px;
  font-size: 20px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
export const InputSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 10px;
  padding-left: 10px;
  background-color: #fff;
`;

export const ListPagination = styled.div`
  width: 10%;
  margin: 10px auto;
`;
export const ButtonPagination = styled.button`
  margin: 2px;
  font-size: 20px;
  background-color: rgb(215, 215, 215);

  &:hover {
    background-color: rgb(121, 121, 121);
  }
`;

export const TableContainer = styled.div`
  display: flex;
  background-color: #fff;
  width: 80vw;
  margin: 0 auto;
  margin-top: 80px;
  position: relative;
  white-space: nowrap;
`;
export const DivTableName = styled.div`
  width: 25%;
`;
export const DivTableData = styled.div`
  width: 75%;
  overflow: auto;
`;
export const TableName = styled.table`
  width: 100%;
`;
export const Table = styled.table`
  width: 100%;
`;
export const TableHeader = styled.thead`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  height: 80px;
`;
export const TableBody = styled.tbody``;

export const TableData = styled.td`
  border-bottom: 1px solid black;
  padding: 15px;
  width: 100%;
`;
export const TableRow = styled.tr`
  width: 100%;
  height: 60px !important;
  margin: 0;
  &:hover {
    background-color: rgb(232, 241, 252);
  }
`;

export const ButtonSortContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: auto;
  margin-left: 5px;
`;
export const ButtonSort = styled.button`
  padding: 0;
  background-color: #fff;
  color: #000;
  border: none;
`;
