import DataFrame from "../combine";
import { DataFrameStructure } from "../implementations/dataFrameStructure";

export abstract class AbstractFileIO {
    public fromCSV(path: string): DataFrame {
        return this._fromCSV(path);
    }

    public fromJSON(path: string): DataFrame {
        return this._fromJSON(path);
    }

    protected abstract _fromCSV(path: string): DataFrame;

    protected abstract _fromJSON(path: string): DataFrame;
}