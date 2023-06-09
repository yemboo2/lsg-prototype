import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  height: 60px;
  box-shadow: 0px 2px 2px 1px rgb(95, 125, 124);
  background-color: rgba(0, 0, 0, 0.25);

  .header-element {
    display: flex;
    padding: auto;
    width: 200px;

    .header-element-text {
      margin: auto;
      font-size: 18px;
      font-weight: bold;
      color: white;
      cursor: pointer;

      &.selected {
        padding-top: 2px;
        border-bottom: solid 2px white;
      }
    }
  }

  .logo-container {
    margin: auto;
    margin-top: 0px;
    background-color: rgba(0, 0, 0, 1);
    height: 60px;
    width: 60px;
    border-radius: 32px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding-left: 3px;
    padding-top: 4px;

    cursor: pointer;
  }

  .language-container {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .back-button-container {
    position: absolute;
    left: 15px;
    top: 15px;

    .back-button {
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
  }

  .border-b-w {
    border-bottom: solid 2px red;
  }
`;
