import { DataFrameOptions } from ".";

export class DataFrame {
    readonly default_n: number
    readonly _columns: string[];
    readonly _data: any[][];

    constructor(options: DataFrameOptions) {
        this._columns = options.columns;
        this._data = options.data;
        this.default_n = 5
    }
}