import styled from '@emotion/styled';

export const Container = styled.div`
  margin-top: 15vh;
`;

export const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ListItemContainer = styled.div`
  width: 30%;
  height: 6vh;
  min-height: 30px;
  .container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  margin: 3px;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  background-color: green;

  .draggable {
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }
`;
