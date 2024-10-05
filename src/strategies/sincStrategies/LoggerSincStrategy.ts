import { LOGLEVEL } from "../../config/Loglevel";
import { Message } from "../../models/Message";

export class LoggerSincStrategy {
    constructor(protected _logLevel: LOGLEVEL) {
    }
    execute(message: Message, ts_format: string): void {
        throw new Error("Method not implemented.");
    }
    validateByLogLevel(message: Message): boolean {
        return message.level >= this._logLevel;
    }
}