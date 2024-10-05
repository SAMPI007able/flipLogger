import { LOGLEVEL } from "./config/Loglevel";
import { LogType } from "./config/LogType";
import { Message } from "./models/Message";
import { AsyncStrategy } from "./strategies/loggerTypeStrategies/AsyncStrategy";
import { LoggerTypeStrategy } from "./strategies/loggerTypeStrategies/LoggerTypeStrategy";
import { SyncStrategy } from "./strategies/loggerTypeStrategies/SyncStrategy";
import { LoggerSincStrategy } from "./strategies/sincStrategies/LoggerSincStrategy";
import { StdoutStrategy } from "./strategies/sincStrategies/StdoutStrategy";

export class LoggerApp {
    private log_level: LOGLEVEL = LOGLEVEL.INFO;
    private loggerTypeStrategy: LoggerTypeStrategy ;
    constructor(private _ts_format: string, private _log_level: string, private logger_type: string, private buffer_size: number, private _sink_type: string) {
        this.log_level = this.getLogLevel(_log_level);
        const sink_typeStrategy = _sink_type === "stdout" ? new StdoutStrategy(this.log_level) : new LoggerSincStrategy(this.log_level);
        if(logger_type === "async") {
            this.loggerTypeStrategy = new AsyncStrategy(LogType.ASYNC, buffer_size, sink_typeStrategy, _ts_format);
        } else {
            this.loggerTypeStrategy = new SyncStrategy(LogType.ASYNC, sink_typeStrategy, _ts_format);
        }
    }

    getLogLevel(_log_level: string): LOGLEVEL {
        if(_log_level==="DEBUG") {
            return LOGLEVEL.DEBUG;
        } else if(_log_level==="INFO") {
            return LOGLEVEL.INFO;
        } else if(_log_level==="WARN") {
            return LOGLEVEL.WARN;
        } else if(_log_level==="ERROR") {
            return LOGLEVEL.ERROR;
        } else if(_log_level==="FATAL") {
            return LOGLEVEL.FATAL;
        }
        return LOGLEVEL.INFO;
    }
    async DEBUG(content: string, level : string) {
        const message = new Message(content, LOGLEVEL.DEBUG);
        await this.loggerTypeStrategy.process(message);
    }
    async INFO(content: string, level : string) {
        const message = new Message(content, LOGLEVEL.INFO);
        await this.loggerTypeStrategy.process(message);
    }
    async WARN(content: string, level : string) {
        const message = new Message(content, LOGLEVEL.WARN);
        await this.loggerTypeStrategy.process(message);
    }
    async ERROR(content: string, level : string) {
        const message = new Message(content, LOGLEVEL.ERROR);
        await this.loggerTypeStrategy.process(message);
    }
    async FATAL(content: string, level : string) {
        const message = new Message(content, LOGLEVEL.FATAL);
        this.loggerTypeStrategy.process(message);
    }
    
}