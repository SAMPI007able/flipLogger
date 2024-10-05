import { LOGLEVEL } from "../config/Loglevel";
export class Message {
    content: string;
    level: LOGLEVEL;
    constructor(private _content: string, private _level: LOGLEVEL) {
        this.content = _content;
        this.level = _level;
    }
}