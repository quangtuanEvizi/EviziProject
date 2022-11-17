/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

export default function EmptyPage() {
  return (
    <EmptyContainer>
      <EmptyIcon>
        <img src="http://192.168.1.189:13030/45b1436e7c1e89c89850d4ea0721d6f1.svg" />
      </EmptyIcon>
      <EmptyHeader>
        <h1>No results found</h1>
      </EmptyHeader>
      <EmptyTitle>
        <p>
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </EmptyTitle>
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
`;
const EmptyIcon = styled.div`
  margin-top: 100px;
  img {
    height: 150px;
    width: auto;
  }
`;
const EmptyHeader = styled.div`
  margin: 40px;
  h1{
    font-size: 60px;
  }
`;
const EmptyTitle = styled.div`
  p{
    font-size:30px;
  }
`;
