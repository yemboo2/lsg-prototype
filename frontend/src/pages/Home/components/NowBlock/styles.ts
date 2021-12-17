import styled from '@emotion/styled';

export const Containter = styled.div`
  position: relative;
  padding: 2vh;
  border: 4px solid white;
  border-radius: 10px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* -webkit-transition: background-color 1000ms linear;
  -moz-transition: background-color 1000ms linear;
  -o-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear;
  transition: background-color 1000ms linear;
  transition: background-color 1000ms linear; */
  // TODO: add 2 backgrounds 1 with color one with image and have both stacked and opacity transition the top (gradient) in & out

  .heading {
    position: absolute;
    top: 5vh;
  }

  .snooze {
    position: absolute;
    bottom: 20%;
  }

  .pause-play {
    cursor: pointer;
    position: absolute;
    top: 1vh;
    right: 1vh;
    padding: 2px;
  }

  .pause-play.disabled {
    cursor: auto;
  }

  .mute-unmute {
    cursor: pointer;
    position: absolute;
    top: 1vh;
    left: 1vh;
    padding: 2px;
  }
`;
