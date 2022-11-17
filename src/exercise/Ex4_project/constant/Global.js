import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: hsl(0, 0%, 100%);
    color: hsl(0, 1%, 16%);
    font-family: monospace;
    height: 100%;
    overflow-x: hidden;
  }
  button{
    background-color: rgb(229,58,78);
    text-transform: uppercase;
    color: #fff;
  }
  a {
    text-decoration: none;
    font-weight: 700;
    color: rgb(43,65,106);
    font-size: 18px;
  }
`