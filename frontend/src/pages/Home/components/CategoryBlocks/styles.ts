import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  .block-container {
    display: flex;
    flex-direction: row;
  }
  .block-container:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  .color-block {
    height: 23px;
    width: 23px;
    border-radius: 1px;
    margin-right: 5px;
  }
`;
