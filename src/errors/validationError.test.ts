import { ValidationError } from '@errors';

describe('ValidationError error', () => {
  const message = 'message';
  let error: ValidationError;

  describe('when called with no args', () => {
    beforeEach(() => {
      error = new ValidationError();
    });

    it('has message attribute with default empty string', () => {
      expect(error.message).toEqual('');
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('ValidationError');
    });
  });

  describe('when called with args', () => {
    beforeEach(() => {
      error = new ValidationError(message);
    });

    it('has message attribute', () => {
      expect(error.message).toEqual(message);
    });

    it('has name attribute', () => {
      expect(error.name).toEqual('ValidationError');
    });
  });
});
