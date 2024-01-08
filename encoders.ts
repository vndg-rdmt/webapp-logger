import * as types from "./interface";


export class ConsoleCoder implements types.IConsoleLogsCoder {
    public constructor() {}

    protected readonly fieldsStyling: string = 'color: #68868E;';

    public encode(buffer: types.ILogField[], annotate: types.ILogField[]): [string, string[]] {

        const tmp = new Array<string>(annotate.length);
        const colorized = new Array(annotate.length);

        for (const anot of annotate) {
            switch (anot[0]) {
                
                case ("timestamp"): {
                    tmp[0] = '%c' + anot[1];
                    colorized[0] = 'color: #606060;';
                    break;
                }
                case ("level"): {
                    tmp[1] = '%c' + anot[1];
                    colorized[1] = 'color: #00BBB3; font-weight: bold';
                    break;
                }
                case ("message"): {
                    tmp[2] = '%c' + anot[1];
                    colorized[2] = 'font-weight: normal;';
                    break;
                }
                default: {
                    tmp[tmp.indexOf(undefined!)] = this.convert(anot[0], anot[1]);
                    break;
                }
            };
        };

        const content = buffer.map(e => this.convert(e[0], e[1]));

        if (buffer.length > 0) {
            content[0] = '%c' + content[0];
            colorized.push(this.fieldsStyling);
        };

        return [tmp.concat(content).join(' '), colorized]
    }

    protected convert(key: string, value: string): string {
        return `${key}: ${value}`
    }
    
    public decode(rawlog: string): types.ILogField[] {
        return []; 
    }
}