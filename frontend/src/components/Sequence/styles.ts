import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 0px solid white;
  border-radius: 5px;

  div:first-of-type {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  div:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
