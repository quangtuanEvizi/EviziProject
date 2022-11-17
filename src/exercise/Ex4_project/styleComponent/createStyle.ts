import styled from "styled-components";

export const CreateContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 2%;
  text-transform: uppercase;
`;
export const CreateHeader = styled.div`
  a {
    text-decoration: none;
    padding: 10px 30px;
    background-color: rgb(238, 238, 238);
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
  }
`;
export const H1 = styled.div`
  margin-bottom: 15px;
`;

export const CreateForm = styled.form`
  margin: 2vh auto;
  padding: 2%;
  width: 80%;
  height: 60%;
  background-color: rgb(244, 246, 248);
  border-radius: 5px;
`;
export const ButtonForm = styled.button`
  background-color: rgb(26, 184, 137);
  margin-right: 10%;
  color: rgb(223, 223, 223);
  font-weight: 700;
  font-size: 15px;
  padding: 20px;
  border: none;
  border-radius: 5px;
  float: right;

  &:hover {
    background-color: rgb(32, 192, 144);
    color: #fff;
  }
`;
