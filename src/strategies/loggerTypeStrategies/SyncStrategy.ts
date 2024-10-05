import { LogType } from "../../config/LogType";
import { Message } from "../../models/Message";
import { LoggerSincStrategy } from "../sincStrategies/LoggerSincStrategy";
import { LoggerTypeStrategy } from "./LoggerTypeStrategy";

export class SyncStrategy extends LoggerTypeStrategy {
    constructor(public _loggerType: LogType, public _sink_typeStrategy: LoggerSincStrategy, public _ts_format: string) {
        super(_loggerType, _sink_typeStrategy, _ts_format);
    }
    getLoggerType(): string {
        return this._loggerType;
    }
    async process(message: Message): Promise<void> {
        this._sink_typeStrategy.execute(message, this._ts_format);
        return Promise.resolve();
    }
}