
import {join} from "path";
import { IConnection } from "../sockets/connection";

export interface ILogger {
	error: (msg: string, ...connections: (IConnection | null | undefined)[]) => void,
	log: (msg: string, ...connections: (IConnection | null | undefined)[]) => void,
}

export const getLogger = (projectName: string, logsPath: string = join(__dirname, '../../logs')): ILogger => {

	const getDateString = ():string => {
		const date = new Date();
		const year = date.getFullYear();
		const month = `${date.getMonth() + 1}`.padStart(2, '0');
		const day = `${date.getDate()}`.padStart(2, '0');

		return `${day}_${month}_${year}`;
	};

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const winston = require('winston');

	const logFormatTemplate = (i: { level: string, message: string, [key: string]: any }): string => {
		return `${i.timestamp} ${i.level} -> ${i.message}`;
	};
    
	const logger = winston.createLogger({
		level: 'info',
		format: winston.format.json(),
		//defaultMeta: { service: 'user-service' },
		transports: [
			new winston.transports.File({
				filename: join(logsPath,`/${getDateString()}_${projectName}_error.log`),
				level: 'error',
				maxsize: 5242880, //5MB
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.simple(),
					winston.format.printf(logFormatTemplate)),
				maxFiles: 5,
				colorize: false
			}),
			new winston.transports.File({
				filename: join(logsPath, `/${getDateString()}_${projectName}_log.log`),
				level: 'debug',
				maxsize: 5242880, //5MB
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.simple(),
					winston.format.printf(logFormatTemplate)),
				maxFiles: 5,
				colorize: false
			}),

		],
	});

	if (process.env.NODE_ENV !== 'production') {
		logger.add(new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.simple(),
				winston.format.printf(logFormatTemplate)),

			level: 'debug',
			handleExceptions: true,
			colorize: true
		}));
	}

	const log = (msg: string, ...connections: (IConnection | null | undefined)[]):void => {
		const log = `[${projectName}] -> ${connections.filter(con => con !== null && con !== undefined)
			.map(con => `[${con?.clientName}] [${con?.clientId}]
             connected to [${con?.serverName}] [${con?.serverId}]
             on socket [#${con?.socketNumber}] [${con?.socketId}] -> `)
			.join('')}${msg}`;

		logger.debug(log);
	};

	const error = (msg: string, ...connections: (IConnection | null | undefined)[]):void => {
		const log = `[${projectName}] -> ${connections.filter(con => con !== null && con !== undefined)
			.map(con => `[${con?.clientName}] [${con?.clientId}]
             connected to [${con?.serverName}] [${con?.serverId}]
              on socket [#${con?.socketNumber}] [${con?.socketId}] -> `)
			.join('')}${msg}`;

		logger.error(log);
	};

	return {
		log,
		error,
	};
};

export default getLogger;




