import { LOGLEVEL } from "../../config/Loglevel";
import { Message } from "../../models/Message";
import { MessageDisplay } from "../../models/MessageDisplay";
import { LoggerSincStrategy } from "./LoggerSincStrategy";

export class StdoutStrategy extends LoggerSincStrategy {
    constructor(public _logLevel: LOGLEVEL) {
        super(_logLevel);
    }
    execute(message: Message, _ts_format: string): void {
        const isValid = this.validateByLogLevel(message);
        if (isValid) {
            const messageDisplay = new MessageDisplay(message, _ts_format);
            console.log(messageDisplay.display());
        }
    }
}