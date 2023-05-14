import { DataFrame } from '../implementations/dataFrame';
import { DataFrameStructure } from '../implementations/dataFrameStructure';
import { GroupBy } from '../implementations/groupBy';

/**
 * An abstract class that provides data manipulation methods for DataFrame objects.
 */
export abstract class AbstractDataManipulation extends DataFrameStructure {

    /**
    * Adds two columns together and returns the result as a new DataFrame object.
    *
    * @param {string} columnName - The name of the new column to create.
    * @param {string} column1 - The name of the first column to add.
    * @param {string} column2 - The name of the second column to add.
    * @returns {DataFrame} A new DataFrame object with the new column added.
    */
    public addColumns(
        columnName: string,
        column1: string,
        column2: string,
    ): DataFrame {
        return this._addColumns(columnName, column1, column2);
    }


    /**
    * Filters the DataFrame object by a column value and returns the filtered DataFrame object.
    *
    * @param {string} column - The name of the column to filter by.
    * @param {(string | number)} value - The value to filter by.
    * @returns {DataFrame} A new DataFrame object with the filtered rows.
    */
    public filter(column: string, value: string | number): DataFrame {
        return this._filter(column, value);
    }


    /**
   * Sorts the DataFrame object by one or more columns and returns the sorted DataFrame object.
   *
   * @param {string[]} columns - An array of column names to sort by.
   * @param {('asc' | 'desc')[]} [orders=[]] - An array of sort orders for each column. Default is ascending order.
   * @returns {DataFrame} A new DataFrame object with the sorted rows.
   */
    public sort(columns: string[], orders: ('asc' | 'desc')[] = []): DataFrame {
        return this._sort(columns, orders);
    }


    /**
   * Groups the DataFrame object by one or more columns and returns a GroupBy object.
   *
   * @param {DataFrame} dataFrame - The DataFrame object to group.
   * @param {string[]} columns - An array of column names to group by.
   * @returns {GroupBy} A GroupBy object that can be used to aggregate the groups.
   */
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
