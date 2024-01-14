import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;
const basicFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

export const logger = createLogger({
  format: combine(colorize({ all: true }), timestamp(), basicFormat),
  transports: [new transports.Console()],
});
