import { DataFrameIterator, DataFrameOptions, DataFrameRow } from ".";
import { DataFrameStructure } from "../implementations/dataFrameStructure";


export abstract class AbstractDataFrameStructure implements DataFrameIterator {

    protected abstract _columns: string[];
    protected abstract _data: any[][];

    get columns(): string[] {
        return this._columns;
    }

    get data(): any[][] {
        return this._data;
    }

    public dropColumn(columnName: string): DataFrameStructure {
        return this._dropColumn(columnName);
    }

    public getColumnTypes(): { [column: string]: string } {
        return this._getColumnTypes();
    }

    public head(n?: number): DataFrameStructure {
        return this._head(n);
    }

    public renameColumn(oldColumnName: string, newColumnName: string): DataFrameStructure {
        return this._renameColumn(oldColumnName, newColumnName);
    }

    get rows(): number {
        return this._data.length;
    }

    public select(...columns: string[]): DataFrameStructure {
        return this._select(...columns);
    }

    get shape(): [number, number] {
        return [this.rows, this.columns.length];
    }

    public tail(n?: number): DataFrameStructure {
        return this._tail(n);
    }

    toString(): string {
        return this._toString();
    }

    public details(): string {
        return this._details();
    }

    public toCSV(path: string): void {
        this._toCSV(path);
    }

    public toJSON(path: string): void {
        this._toJSON(path);
    }


    abstract [Symbol.iterator](): IterableIterator<DataFrameRow>

    protected abstract _head(n?: number): DataFrameStructure

    protected abstract _tail(n?: number): DataFrameStructure

    protected abstract _getColumnTypes(): { [column: string]: string }

    protected abstract _renameColumn(oldColumnName: string, newColumnName: string): DataFrameStructure

    protected abstract _dropColumn(columnName: string): DataFrameStructure

    protected abstract _select(...columns: string[]): DataFrameStructure

    protected abstract _details(): string;

    protected abstract _toString(): string;

    protected abstract _toCSV(path: string): void;

    protected abstract _toJSON(path: string): void;


}