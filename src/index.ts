import { LoggerApp } from "./LoggerApp";

export class LoggerDriver {
    public app!: LoggerApp;
    constructor(ts_format: string, log_level: string, logger_type: string, buffer_size: number, sink_type: string) {
        this.app = new LoggerApp(ts_format, log_level, logger_type, buffer_size, sink_type);
     }
    run() {
        // + Example usage
        this.app.DEBUG("Hello World", "DEBUG");
        this.app.INFO("This is a very large message that exceeds one hundred characters in length, demonstrating how to handle longer log messages effectively.", "INFO");
        this.app.WARN("Hello World", "WARN");
        this.app.ERROR("Hello World", "ERROR");
        this.app.FATAL("Hello World", "FATAL");
        // - Example usage
    }
}

const loggerDriver = new LoggerDriver("yyyy-MM-dd HH-mm-ss", "INFO", "async", 10, "stdout");
loggerDriver.run();