import { UnauthorizedError } from '@errors';

describe('UnauthorizedError error', () => {
  const message = 'message';
  let error: UnauthorizedError;

  describe('when called with no args', () => {
    beforeEach(() => {
      error = new UnauthorizedError();
    });

    it('has message attribute with default empty string', () => {
      expect(error.message).toEqual('');
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('UnauthorizedError');
    });
  });

  describe('when called with args', () => {
    beforeEach(() => {
      error = new UnauthorizedError(message);
    });

    it('has message attribute', () => {
      expect(error.message).toEqual(message);
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('UnauthorizedError');
    });
  });
});
