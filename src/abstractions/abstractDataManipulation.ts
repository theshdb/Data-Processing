import DataFrame from '../implementations/dataFrame';
import { DataFrameStructure } from '../implementations/dataFrameStructure';
import { GroupBy } from '../implementations/groupBy';

export abstract class AbstractDataManipulation extends DataFrameStructure {
    public addColumns(
        columnName: string,
        column1: string,
        column2: string,
    ): DataFrame {
        return this._addColumns(columnName, column1, column2);
    }

    public filter(column: string, value: string | number): DataFrame {
        return this._filter(column, value);
    }

    public sort(columns: string[], orders: ('asc' | 'desc')[] = []): DataFrame {
        return this._sort(columns, orders);
    }

    public groupBy(dataFrame: DataFrame, columns: string[]): GroupBy {
        return this._groupBy(dataFrame, columns);
    }

    protected abstract _addColumns(
        columnName: string,
        column1: string,
        column2: string,
    ): DataFrame;

    protected abstract _filter(
        column: string, value: string | number,
    ): DataFrame;

    protected abstract _groupBy(
        dataFrame: DataFrame,
        columns: string[],
    ): GroupBy;

    protected abstract _sort(
        columns: string[],
        orders: ('asc' | 'desc')[],
    ): DataFrame;
}
