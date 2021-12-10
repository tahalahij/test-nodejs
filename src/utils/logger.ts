import * as winston from 'winston';
import { format } from 'logform';
import { LOG_LABELS } from '../constants/enums';

const { printf } = format;

const customFormatter = printf(
    ({ level, message, timestamp }) => `${timestamp} ${level} ${message}`
);
const options = {
    transports: [
        new winston.transports.Console({
            format: format.combine(format.timestamp(), customFormatter),
        }),
    ],
};

const logger = winston.createLogger(options);

export default class Logger {
    static labels = LOG_LABELS;

    static error(
        label: string,
        info: Record<string, unknown> | string,
        error: Error
    ): void {
        logger.log('error', `[${label}]`, {
            info,
            error,
        });
    }

    static debug(
        label: string,
        message: Record<string, unknown> | string,
        meta?: Record<string, unknown>
    ): void {
        logger.log('debug', `[${label.toUpperCase()}]: ${message}`, {
            message: JSON.stringify(meta),
        });
    }

    static info(
        label: string,
        message: Record<string, unknown> | string,
        meta?: Record<string, unknown>
    ): void {
        logger.log('info', `[${label.toUpperCase()}]: ${message}`, {
            message: JSON.stringify(meta),
        });
    }
}
