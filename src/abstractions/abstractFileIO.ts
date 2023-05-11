import { DataFrameStructure } from "../implementations/dataFrameStructure";

export abstract class AbstractFileIO {
    public fromCSV(path: string): DataFrameStructure {
        return this._fromCSV(path);
    }

    public fromJSON(path: string): DataFrameStructure {
        return this._fromJSON(path);
    }

    // public toCSV(path: string): void {
    //     this._toCSV(path);
    // }

    // public toJSON(path: string): void {
    //     this._toJSON(path);
    // }

    protected abstract _fromCSV(path: string): DataFrameStructure;

    protected abstract _fromJSON(path: string): DataFrameStructure;

    // protected abstract _toCSV(path: string): void;

    // protected abstract _toJSON(path: string): void;
}