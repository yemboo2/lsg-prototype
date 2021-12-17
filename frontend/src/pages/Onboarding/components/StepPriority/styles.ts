import styled from '@emotion/styled';

export const Container = styled.div`
  .selectors {
    padding-top: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .activity-selector {
    width: 200px;
  }

  .priority-selector {
    width: 100px;
  }

  option {
    background-color: 'rgba(255, 250, 240, 0.05)';
  }
`;
