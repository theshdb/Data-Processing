import { DataFrameStructure } from "../implementations/dataFrameStructure";

export abstract class AbstractFileIO {
    public fromCSV(path: string): DataFrameStructure {
        return this._fromCSV(path);
    }

    public fromJSON(path: string): DataFrameStructure {
        return this._fromJSON(path);
    }

    protected abstract _fromCSV(path: string): DataFrameStructure;

    protected abstract _fromJSON(path: string): DataFrameStructure;
}