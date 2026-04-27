import logger from './logger';

// Logger binds console methods at construction (singleton). Verify the
// bound functions actually forward calls through to console by spying
// before the module initialises via isolateModules.
describe('Logger', () => {
  it.each(['log', 'info', 'warn', 'error', 'debug'] as const)(
    'delegates %s to console',
    (method) => {
      const spy = jest.spyOn(console, method).mockImplementation(() => {});

      jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const freshLogger = require('./logger').default;
        freshLogger[method]('test message');
      });

      expect(spy).toHaveBeenCalledWith('test message');
      spy.mockRestore();
    }
  );

  it('exposes all log-level methods on the singleton', () => {
    for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
      expect(typeof logger[method]).toBe('function');
    }
  });
});
