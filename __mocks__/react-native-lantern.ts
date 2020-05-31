const lanternMockModule = {
  ready: jest.fn(() => Promise.resolve()),
  turn: jest.fn(() => Promise.resolve()),
  turnOn: jest.fn(() => Promise.resolve()),
  turnOff: jest.fn(() => Promise.resolve()),
  subscribe: jest.fn(() => () => {}),
};

export default lanternMockModule;
