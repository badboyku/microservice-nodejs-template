import process from 'node:process';
import type { Config } from '@types';

describe('Config Util', () => {
  const ENV_BACKUP = process.env;
  let config: Config;

  describe('calling var app.logLevel', () => {
    const testCases = [
      { val: 'foo', expected: 'FOO' },
      { val: '', expected: 'INFO' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.APP_LOG_LEVEL ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.APP_LOG_LEVEL = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.logLevel).toEqual(expected);
        });
      });
    });
  });

  describe('calling var app.logOutputFormat', () => {
    const testCases = [
      { val: 'foo', expected: 'FOO' },
      { val: '', expected: 'ELK' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.APP_LOG_OUTPUT_FORMAT ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.APP_LOG_OUTPUT_FORMAT = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.logOutputFormat).toEqual(expected);
        });
      });
    });
  });

  describe('calling var app.name', () => {
    const testCases = [
      { val: 'foo', expected: 'FOO' },
      { val: '', expected: '' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.npm_package_name ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.npm_package_name = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.name).toEqual(expected);
        });
      });
    });
  });

  describe('calling var app.nodeEnv', () => {
    const testCases = [
      { val: 'foo', expected: 'FOO' },
      { val: '', expected: '' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.NODE_ENV ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.NODE_ENV = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.nodeEnv).toEqual(expected);
        });
      });
    });
  });

  describe('calling var app.port', () => {
    const testCases = [
      { val: '1234', expected: 1234 },
      { val: '', expected: 3000 },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.APP_PORT ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.APP_PORT = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.port).toEqual(expected);
        });
      });
    });
  });

  describe('calling var app.version', () => {
    const testCases = [
      { val: 'foo', expected: 'FOO' },
      { val: '', expected: '' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.npm_package_version ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.npm_package_version = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.app.version).toEqual(expected);
        });
      });
    });
  });

  describe('calling var cors.allowedHeaders', () => {
    const testCases = [
      { val: 'foo', expected: 'foo' },
      { val: '', expected: '' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.CORS_ALLOWED_HEADERS ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.CORS_ALLOWED_HEADERS = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.cors.allowedHeaders).toEqual(expected);
        });
      });
    });
  });

  describe('calling var cors.credentials', () => {
    const testCases = [
      { val: 'TRUE', expected: true },
      { val: '', expected: false },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.CORS_CREDENTIALS ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.CORS_CREDENTIALS = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.cors.credentials).toEqual(expected);
        });
      });
    });
  });

  describe('calling var cors.whitelist', () => {
    const testCases = [
      { val: 'foo', expected: 'foo' },
      { val: '', expected: '' },
    ];
    testCases.forEach(({ val, expected }) => {
      describe(`when process.env.CORS_WHITELIST ${val ? 'set' : 'not set'}`, () => {
        beforeEach(() => {
          jest.resetModules();
          process.env.CORS_WHITELIST = val;

          config = jest.requireActual('./config').default;
        });

        afterAll(() => {
          process.env = ENV_BACKUP;
        });

        it(`returns ${val ? 'value' : 'default'}`, () => {
          expect(config.cors.whitelist).toEqual(expected);
        });
      });
    });
  });
});
