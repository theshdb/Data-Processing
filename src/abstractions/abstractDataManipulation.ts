import { DataFrameRow } from ".";
import { DataFrame } from "../implementations/dataFrame";
import { GroupBy } from "../implementations/groupBy";

export abstract class AbstractDataManipulation extends DataFrame {

    public addColumns(columnName: string, column1: string, column2: string): DataFrame {
        return this._addColumns(columnName, column1, column2)
    }

    public filter(predicate: (row: DataFrameRow) => boolean): DataFrame {
        return this._filter(predicate)
    }

    public sort(columns: string[], orders: ('asc' | 'desc')[] = []): DataFrame {
        return this._sort(columns, orders)
    }

    public groupBy(dataFrame: DataFrame, ...columns: string[]): GroupBy {
        return this._groupBy(dataFrame, ...columns)
    }

    protected abstract _addColumns(columnName: string, column1: string, column2: string): DataFrame

    protected abstract _filter(predicate: (row: DataFrameRow) => boolean): DataFrame

    protected abstract _groupBy(dataFrame: DataFrame, ...columns: string[]): GroupBy

    protected abstract _sort(columns: string[], orders: ('asc' | 'desc')[]): DataFrame

}   
