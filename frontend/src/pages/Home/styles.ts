import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 50px;

  .content-container {
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .sequence-selector {
      display: flex;
      flex-direction: row; // FIXME: column if PHONE
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2vh;

      .create-sequence {
        color: white;
        font-weight: bold;
        cursor: pointer;
      }

      .create-sequence.disabled {
        cursor: auto;
        color: rgba(255, 255, 255, 0.3);
      }
    }

    .rep-container {
      display: flex;
      flex-direction: row; // FIXME: column if PHONE
      margin-bottom: 2vh;
    }

    .sequence {
      width: 80%;
      margin-bottom: 3vh;
    }

    .now-container {
      width: 80%;
      margin: auto;
    }
  }
`;