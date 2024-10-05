import { LOGLEVEL } from "../../config/Loglevel";
import { Message } from "../../models/Message";
import { LoggerSincStrategy } from "./LoggerSincStrategy";

export class StdoutStrategy extends LoggerSincStrategy {
    constructor(public _logLevel: LOGLEVEL) {
        super(_logLevel);
    }
    execute(message: Message, _ts_format: string): void {
        throw new Error("Method not implemented.");
    }
}