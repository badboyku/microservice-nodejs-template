/* eslint-disable no-console */
import correlator from 'express-correlation-id';
import { config } from '@utils';
import { LOG_FORMATS, LOG_LEVELS, LOG_LEVELS_NUM } from '@utils/constants';
import type { LogContext, Logger } from '@types';

const { DEBUG, INFO, WARN, ERROR } = LOG_LEVELS;
const { DEBUG: DEBUG_NUM, INFO: INFO_NUM, WARN: WARN_NUM, ERROR: ERROR_NUM } = LOG_LEVELS_NUM;

const getSeverityNum = (severity: string): number => {
  switch (severity) {
    case DEBUG:
      return DEBUG_NUM;
    case INFO:
      return INFO_NUM;
    case WARN:
      return WARN_NUM;
    case ERROR:
    default:
      return ERROR_NUM;
  }
};

const skipLog = (severity: string): boolean => getSeverityNum(severity) < getSeverityNum(config.app.logLevel);

const getLogMessage = (severity: string, message: string, context?: LogContext): string => {
  const log = { correlationId: correlator.getId(), severity, message, context };

  return config.app.logOutputFormat === LOG_FORMATS.DEV ? JSON.stringify(log, null, 4) : JSON.stringify(log);
};

const logger: Logger = {
  debug: (message: string, context?: LogContext) =>
    !skipLog(DEBUG) && console.debug(getLogMessage(DEBUG, message, context)),
  info: (message: string, context?: LogContext) =>
    !skipLog(INFO) && console.info(getLogMessage(INFO, message, context)),
  warn: (message: string, context?: LogContext) =>
    !skipLog(WARN) && console.warn(getLogMessage(WARN, message, context)),
  error: (message: string, context?: LogContext) =>
    !skipLog(ERROR) && console.error(getLogMessage(ERROR, message, context)),
};

export default logger;
