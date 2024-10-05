const { LoggerDriver } = require("../output/index");

describe("LoggerDriver Load Test", () => {
    let loggerDriver;

    beforeEach(() => {
        loggerDriver = new LoggerDriver("yyyy-MM-dd HH-mm-ss", "INFO", "async", 2000, "stdout");
    });

    test("should handle 1000 concurrent log messages", async () => {
        console.time("Logging 1000 messages");
    
        // Generate 1000 log messages
        const messages = Array.from({ length: 1000 }, (_, index) => ({
            level: "INFO",
            message: `Log message ${index}`,
        }));
    
        // Map log messages to promises
        const logPromises = messages.map((msg) =>
            new Promise(async (resolve, reject) => {
                try {
                    await loggerDriver.app.INFO(msg.message, msg.level);
                    resolve();
                } catch (error) {
                    console.error("Error logging message:", error);
                    reject(error);
                }
            })
        );
    
        // Await all promises and ensure all messages are logged
        await Promise.allSettled(logPromises);
    
        console.timeEnd("Logging 1000 messages");
    });
    
    
});
