import { DataFrameIterator, DataFrameOptions, DataFrameRow } from ".";
import { DataFrame } from "../implementations/dataFrame";


export abstract class AbstractDataFrame implements DataFrameIterator {

    protected readonly _columns: string[];
    protected readonly _data: any[][];

    constructor(options: DataFrameOptions) {
        this._columns = options.columns;
        this._data = options.data;
    }

    get columns(): string[] {
        return this._columns;
    }

    get data(): any[][] {
        return this._data;
    }

    public dropColumn(columnName: string): DataFrame {
        return this._dropColumn(columnName);
    }

    public getColumnTypes(): { [column: string]: string } {
        return this._getColumnTypes();
    }

    public head(n?: number): DataFrame {
        return this._head(n);
    }

    public renameColumn(oldColumnName: string, newColumnName: string): DataFrame {
        return this._renameColumn(oldColumnName, newColumnName);
    }

    get rows(): number {
        return this._data.length;
    }

    public select(...columns: string[]): DataFrame {
        return this._select(...columns);
    }

    get shape(): [number, number] {
        return [this.rows, this.columns.length];
    }

    public tail(n?: number): DataFrame {
        return this._tail(n);
    }

    public toString(): string {
        return this._toString();
    }

    abstract [Symbol.iterator](): IterableIterator<DataFrameRow>

    protected abstract _head(n?: number): DataFrame

    protected abstract _tail(n?: number): DataFrame

    protected abstract _getColumnTypes(): { [column: string]: string }

    protected abstract _renameColumn(oldColumnName: string, newColumnName: string): DataFrame

    protected abstract _dropColumn(columnName: string): DataFrame

    protected abstract _select(...columns: string[]): DataFrame

    protected abstract _toString(): string;
}