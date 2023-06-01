/* eslint-disable no-restricted-globals */

let interval;

self.onmessage = ($event) => {
  if ($event && $event.data && $event.data.msg === 'start-tick') {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if ($event && $event.data && $event.data.msg === 'end-tick') {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  }
};
