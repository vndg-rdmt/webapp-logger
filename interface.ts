import { ConsoleLoggerCore } from "./core"
import { ConsoleCoder } from "./encoders"


export type ILogField = [string, string]

export interface IWriter {
    log(...data: any[]): void
}

export interface ILogsCoder {
    encode(buffer: ILogField[], annotate: ILogField[]): string
    decode(rawlog: string): ILogField[]
}

export interface IConsoleLogsCoder {
    encode(buffer: ILogField[], annotate: ILogField[]): [string, string[]]
    decode(rawlog: string): ILogField[]
}

export interface ILoggerCore {
    pushLog(fields: ILogField[], ...annotate: ILogField[]): void 
}

export interface ILogger {
    debug(msg: string, ...fields: ILogField[]):    void
    info(msg: string,  ...fields: ILogField[]):     void
    warn(msg: string,  ...fields: ILogField[]):     void
    error(msg: string, ...fields: ILogField[]):    void
    fatal(msg: string, ...fields: ILogField[]):    void
}


export interface ILoggerConfig {
    readonly level:            LoggingLevel,
    readonly cores:            ConsoleLoggerCore[],
    readonly keyMessage?:      string,
    readonly keyLevel?:        string,
    readonly keyTimestamp?:    string,
}

export const enum LoggingLevel {
    Debug,
    Info,
    Warn,
    Error,
    Fatal,
}



export interface IConsoleLoggerCore {
    writer: IWriter,
    coder:  ConsoleCoder,
}
