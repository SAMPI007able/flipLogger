import { LOGLEVEL } from "../../config/Loglevel";
import { LogType } from "../../config/LogType";
import { Message } from "../../models/Message";
import { LoggerSincStrategy } from "../sincStrategies/LoggerSincStrategy";
import { LoggerTypeStrategy } from "./LoggerTypeStrategy";
import AsyncLock from 'async-lock';
export class AsyncStrategy extends LoggerTypeStrategy {
    private _messageQueue: any[] = [];
    private _messageQueueSize: number = 0;
    private _messageQueueMaxSize: number = 10;
    lock = new AsyncLock();

    constructor(public _loggerType: LogType, size: number, private _syncStrategy: LoggerSincStrategy, public _ts_format: string) {
        super(_loggerType, _syncStrategy, _ts_format);
        this._messageQueueMaxSize = size;
        this.runExecutionInterval();
    }
    getLoggerType(): string {
        return this._loggerType;
    }
    async process(msg: Message): Promise<void | Error> {
        return new Promise((resolve, reject) => {
            this.lock.acquire('queueLock', () => {
                if (this._messageQueueSize >= this._messageQueueMaxSize) {
                    if (msg.level < LOGLEVEL.INFO) {
                        return resolve();
                    } else {
                        return reject(new Error('Queue overflow'));  // Handle overflow
                    }
                }
                this._messageQueueSize++;
                this._messageQueue.push(msg);
                resolve();
            });
        });
    }

    private runExecutionInterval() {
        setInterval(() => {
            this.lock.acquire('queueLock', async () => {
                const messagesToProcess = this._messageQueue.splice(0, Math.min(5, this._messageQueue.length));
                for (const msg of messagesToProcess) {
                    try {
                        this._sink_typeStrategy.execute(msg, this._ts_format);
                    } catch (error) {
                        console.error(`Failed to log message: ${error}`);
                    }
                }
                this._messageQueueSize = this._messageQueue.length;
            });
        }, 2000);
    }
    
    
}