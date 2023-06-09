import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  padding: 10vh 10%;
  display: flex;
  flex-direction: column;

  .headline {
    width: 100%;
    margin-bottom: 22px;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
