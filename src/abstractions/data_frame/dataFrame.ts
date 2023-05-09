import { DataFrameIterator, DataFrameOptions, DataFrameRow } from ".";
import { DataFrameOperations } from "../../implementations/dataFrame";

export abstract class DataFrame implements DataFrameIterator {

    private readonly default_n: number
    readonly _columns: string[];
    readonly _data: any[][];

    constructor(options: DataFrameOptions) {
        this._columns = options.columns;
        this._data = options.data;
        this.default_n = 5
    }

    abstract get columns(): string[]

    abstract get rows(): number

    abstract [Symbol.iterator](): IterableIterator<DataFrameRow>

    abstract head(n?: number): DataFrameOperations

    abstract tail(n: number): DataFrameOperations

    abstract getColumnTypes(): { [column: string]: string }

    abstract renameColumn(oldColumnName: string, newColumnName: string): DataFrameOperations

    abstract dropColumn(columnName: string): DataFrameOperations

    abstract select(...columns: string[]): DataFrameOperations
}