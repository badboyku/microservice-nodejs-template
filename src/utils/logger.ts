/* eslint-disable no-console */
import correlator from 'express-correlation-id';
import config from './config';
import { LOG_FORMATS, LOG_LEVELS, LOG_LEVELS_NUM } from './constants';
import type { LogContext, Logger } from 'types';

const { DEBUG, INFO, WARN, ERROR } = LOG_LEVELS;
const { DEBUG: DEBUG_NUM, INFO: INFO_NUM, WARN: WARN_NUM, ERROR: ERROR_NUM } = LOG_LEVELS_NUM;

/* region Private helper functions */
const getLogMessage = (severity: string, message: string, context?: LogContext) => {
  const log = { correlationId: correlator.getId(), severity, message, context };

  return config.app.logOutputFormat === LOG_FORMATS.DEV ? JSON.stringify(log, null, 4) : JSON.stringify(log);
};

const getSeverityNum = (severity: string) => {
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

const skipLog = (severity: string) => getSeverityNum(severity) < getSeverityNum(config.app.logLevel);
/* endregion */

const logger: Logger = {
  debug: (message: string, context?: LogContext) => {
    if (skipLog(DEBUG)) {
      return;
    }

    console.debug(getLogMessage(DEBUG, message, context));
  },

  info: (message: string, context?: LogContext) => {
    if (skipLog(INFO)) {
      return;
    }

    console.info(getLogMessage(INFO, message, context));
  },

  warn: (message: string, context?: LogContext) => {
    if (skipLog(WARN)) {
      return;
    }

    console.warn(getLogMessage(WARN, message, context));
  },

  error: (message: string, context?: LogContext) => {
    console.error(getLogMessage(ERROR, message, context));
  },
};

export default logger;
