import { LOGLEVEL } from "../config/Loglevel";
import { Message } from "./Message";
export class MessageDisplay {
    message: Message;
    ts_format: string;
    max_message_length: number = 100;
    constructor(private _message: Message, private _ts_format: string) {
        this.message = _message;
        this.ts_format = this.formatTimestamp(_ts_format);
    }
    display(): string {
        if(this.message.content.length > this.max_message_length) {
            return `${this.ts_format} - [${this.getLogLevel(this.message.level)}] - ${this.message.content.substring(0, this.max_message_length)}...`;
        }
        return `${this.ts_format} - [${this.getLogLevel(this.message.level)}] - ${this.message.content}`;
    }
    private formatTimestamp(ts_format: string): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return ts_format.replace("yyyy", year.toString()).replace("MM", month).replace("dd", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
    }
    getLogLevel(_log_level: LOGLEVEL): string {
        if(_log_level===LOGLEVEL.DEBUG) {
            return "DEBUG";
        } else if(_log_level===LOGLEVEL.INFO) {
            return "INFO";
        } else if(_log_level===LOGLEVEL.WARN) {
            return "WARN";
        } else if(_log_level===LOGLEVEL.ERROR) {
            return "ERROR";
        } else if(_log_level===LOGLEVEL.FATAL) {
            return "FATAL";
        }
        return "INFO";
    }
}