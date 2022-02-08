import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
  z-index: 1;

  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 1%;

    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;

    border-radius: 10px;
    border: 4px white solid;

    background-image: linear-gradient(
      to right,
      #ff9318,
      #ff7a47,
      #ff6571,
      #ff5c9a,
      #ff62c2,
      #f172da,
      #df81ee,
      #ca90ff,
      #a89cff,
      #88a6ff,
      #70acf8,
      #63b0eb
    ); // https://mycolor.space/gradient3

    .info-button-container {
      display: flex;
      justify-content: center;
    }
  }
`;
