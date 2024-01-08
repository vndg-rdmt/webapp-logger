import * as types from "./interface";


export class ConsoleLoggerCore {

    public constructor(
        protected readonly conf: types.IConsoleLoggerCore,
    ) {}

    public pushLog(fields: types.ILogField[], ...annotate: types.ILogField[]): void {
        const [content, styling] = this.conf.coder.encode(fields, annotate);

        this.conf.writer.log(
            content, ...styling,
        );
    }
}