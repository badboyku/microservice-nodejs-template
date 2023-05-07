import { healthController } from '@controllers';
import { healthService } from '@services';
import type { NextFunction, Request, Response } from 'express';

jest.mock('@services/healthService');
jest.mock('@utils/logger');

describe('Health Controller', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      const req = {};
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();
      const code = 200;
      const body = { status: 'ok' };

      beforeEach(() => {
        jest.spyOn(healthService, 'checkHealth').mockReturnValue({ code, body });

        healthController.checkHealth(req as unknown as Request, res as unknown as Response, next as NextFunction);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls healthService.checkHealth', () => {
        expect(healthService.checkHealth).toHaveBeenCalledWith();
      });

      it('sets status on response', () => {
        expect(res.status).toHaveBeenCalledWith(code);
      });

      it('sets json on response', () => {
        expect(res.json).toHaveBeenCalledWith(body);
      });
    });

    describe('with exception', () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const err = new Error('Foo Bar');

      beforeEach(() => {
        jest.spyOn(healthService, 'checkHealth').mockImplementation(() => {
          throw err;
        });

        healthController.checkHealth(req as Request, res as Response, next as NextFunction);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls next with error', () => {
        expect(next).toHaveBeenCalledWith(err);
      });
    });
  });
});
