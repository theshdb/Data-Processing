import { DataFrameStructure } from "../implementations/dataFrameStructure";

export abstract class AbstractionStatisticalOps extends DataFrameStructure {

    public mean(columns: string[]): { [key: string]: number } {
        return this._mean(columns);
    }

    public median(columns: string[]): { [key: string]: number } {
        return this._median(columns);
    }

    public mode(columns: string[]): { [key: string]: number } {
        return this._mode(columns);

    }

    public standardDeviation(columns: string[]): { [key: string]: number } {
        return this._standardDeviation(columns);
    }

    protected abstract _mean(columns: string[]): { [key: string]: number };

    protected abstract _median(columns: string[]): { [key: string]: number };

    protected abstract _mode(columns: string[]): { [key: string]: number };

    protected abstract _standardDeviation(columns: string[]): { [key: string]: number };
}


