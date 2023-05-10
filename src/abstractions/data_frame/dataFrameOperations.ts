import { DataFrameIterator, DataFrameOptions, DataFrameRow } from ".";
import { DataFrame } from "./dataFrame";
// import { DataFrameOperations } from "../../implementations/dataFrame";

export abstract class DataFrameOperations extends DataFrame implements DataFrameIterator {

    constructor(options: DataFrameOptions) {
        super(options)
    }

    // abstract get columns(): string[]

    // abstract get rows(): number

    get columns(): string[] {
        return this._columns;
    }

    get rows(): number {
        return this._data.length;
    }

    get rawData(): any[][] {
        return this._data;
    }

    abstract [Symbol.iterator](): IterableIterator<DataFrameRow>

    abstract head(n?: number): DataFrame

    abstract tail(n: number): DataFrame

    abstract getColumnTypes(): { [column: string]: string }

    abstract renameColumn(oldColumnName: string, newColumnName: string): DataFrame

    abstract dropColumn(columnName: string): DataFrame

    abstract select(...columns: string[]): DataFrame
}