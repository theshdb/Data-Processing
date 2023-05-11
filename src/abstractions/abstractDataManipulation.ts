import { DataFrameRow } from ".";
import { DataFrameStructure } from "../implementations/dataFrameStructure";
import { GroupBy } from "../implementations/groupBy";

export abstract class AbstractDataManipulation extends DataFrameStructure {

    public addColumns(columnName: string, column1: string, column2: string): DataFrameStructure {
        return this._addColumns(columnName, column1, column2)
    }

    public filter(predicate: (row: DataFrameRow) => boolean): DataFrameStructure {
        return this._filter(predicate)
    }

    public sort(columns: string[], orders: ('asc' | 'desc')[] = []): DataFrameStructure {
        return this._sort(columns, orders)
    }

    public groupBy(dataFrame: DataFrameStructure, ...columns: string[]): GroupBy {
        return this._groupBy(dataFrame, ...columns)
    }

    protected abstract _addColumns(columnName: string, column1: string, column2: string): DataFrameStructure

    protected abstract _filter(predicate: (row: DataFrameRow) => boolean): DataFrameStructure

    protected abstract _groupBy(dataFrame: DataFrameStructure, ...columns: string[]): GroupBy

    protected abstract _sort(columns: string[], orders: ('asc' | 'desc')[]): DataFrameStructure

}   
