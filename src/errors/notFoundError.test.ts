import { NotFoundError } from '@errors';

describe('NotFoundError error', () => {
  const message = 'message';
  let error: NotFoundError;

  describe('when called with no args', () => {
    beforeEach(() => {
      error = new NotFoundError();
    });

    it('has message attribute with default empty string', () => {
      expect(error.message).toEqual('');
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('NotFoundError');
    });
  });

  describe('when called with args', () => {
    beforeEach(() => {
      error = new NotFoundError(message);
    });

    it('has message attribute', () => {
      expect(error.message).toEqual(message);
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('NotFoundError');
    });
  });
});
