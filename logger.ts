import * as types from "./interface";


export class Logger implements types.ILogger {

    public static defaultConfig(): types.ILoggerConfig {
        return {
            level: types.LoggingLevel.Debug,
            cores: [],
            keyMessage: "message",
        };
    }


    protected readonly level:           types.LoggingLevel;
    protected readonly cores:           types.ILoggerCore[];
    protected readonly keyMessage:      string;
    protected readonly keyLevel:        string;
    protected readonly keyTimestamp:    string;

    public constructor(conf?: types.ILoggerConfig) {
        if (!conf) {
            conf = Logger.defaultConfig();
        };

        this.cores        = conf.cores;
        this.level        = conf.level;
        this.keyMessage   = "message";
        this.keyLevel     = "level";
        this.keyTimestamp = "timestamp";
    }

    protected readonly levelIds: Array<string> = new Array(
        'Debug',
        'Info',
        'Warn',
        'Error',
        'Fatal',
    );

    public fmtAny(k: string, v: any): types.ILogField {
        return [k, new String(v) as string];
    }

    protected newMessage(msg: string): types.ILogField {
        return [this.keyMessage, msg];
    }

    protected newTimestamp(): types.ILogField {
        return [this.keyTimestamp, Date.now().toString()];
    }

    protected newLevel(level: types.LoggingLevel): types.ILogField {
        return [this.keyLevel, this.levelIds[level]];
    }

    public debug(msg: string, ...fields: types.ILogField[]): void {
        return this.write(types.LoggingLevel.Debug, msg, fields);
    }

    public info(msg: string,  ...fields: types.ILogField[]): void {

        return this.write(types.LoggingLevel.Info, msg, fields);
    }

    public warn(msg: string,  ...fields: types.ILogField[]): void {
        return this.write(types.LoggingLevel.Warn, msg, fields);
    }

    public error(msg: string, ...fields: types.ILogField[]): void {
        return this.write(types.LoggingLevel.Error, msg, fields);
    }

    public fatal(msg: string, ...fields: types.ILogField[]): void {
        return this.write(types.LoggingLevel.Fatal, msg, fields);
    }

    protected write(level: types.LoggingLevel, msg: string, buffer: types.ILogField[]): void {
        if (level < this.level) return;

        for (const w of this.cores) {
            w.pushLog(
                buffer,
                this.newMessage(msg),
                this.newTimestamp(),
                this.newLevel(level),
            );
        };
    }
}
