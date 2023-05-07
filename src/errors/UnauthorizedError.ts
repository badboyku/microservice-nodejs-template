/* istanbul ignore file */
export default class UnauthorizedError extends Error {
  constructor(message = '') {
    super(message);

    this.name = this.constructor.name;
  }
}
