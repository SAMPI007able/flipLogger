import { LogType } from "../../config/LogType";
import { Message } from "../../models/Message";
import { LoggerSincStrategy } from "../sincStrategies/LoggerSincStrategy";
export class LoggerTypeStrategy {
    constructor(protected _loggerType: LogType, protected _sink_typeStrategy: LoggerSincStrategy, public _ts_format: string) {
    }
    getLoggerType(): string {
        return this._loggerType;
    }
    async process(message: Message): Promise<void | Error> {
        throw new Error("Method not implemented.");
    }
}