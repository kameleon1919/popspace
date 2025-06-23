// because JSDOM doesn't seem to expose EventSource to inherit

import { EventEmitter } from 'events';

// from, utilizing EventEmitter to mock its behavior.
class MockEventSource extends EventEmitter {
  addEventListener = this.on;
  removeEventListener = this.off;
  dispatchEvent = (event: Event) => {
    this.emit(event?.type, event);
  };
}

class MockWebSocket extends MockEventSource {
  constructor(public url: string) {
    super();
  }

  // you must manually open the socket to better emulate real life behavior
  readyState: 0 | 1 | 2 | 3 = WebSocket.CONNECTING;

  send = jest.fn();
  close = jest.fn(() => {
    this.readyState = WebSocket.CLOSING as 2;
    this.emit('close', new CloseEvent('close', { code: 1000 }));
  });
  reconnect = jest.fn();
}

export default MockWebSocket;
