import { DataFrameIterator, DataFrameRow } from './interfaces';
import { DataFrame } from '../implementations/dataFrame';

/**
 * An abstract class that provides a common interface for data frame structures.
 * It implements the DataFrameIterator interface.
 */
export abstract class AbstractDataFrameStructure implements DataFrameIterator {
    /**
     * The columns of the data frame.
     */
    protected abstract _columns: string[];


    /**
     * The data of the data frame.
     */
    protected abstract _data: any[][];

    get columns(): string[] {
        return this._columns;
    }

    get data(): any[][] {
        return this._data;
    }

    /**
     * Drops a column from the data frame.
     *
     * @param {string} columnName - The name of the column to drop.
     * @returns {DataFrame} A new data frame with the specified column dropped.
     */
    public dropColumn(columnName: string): DataFrame {
        return this._dropColumn(columnName);
    }

    /**
     * Returns an object containing the data types of each column in the data frame.
     *
     * @returns {Object} An object containing the data types of each column.
     */
    public getColumnTypes(): { [column: string]: string } {
        return this._getColumnTypes();
    }

    /**
     * Returns the first n rows of the data frame.
     *
     * @param {number} [n] - The number of rows to return. Defaults to 5.
     * @returns {DataFrame} A new data frame containing the first n rows of the data frame.
     */
    public head(n?: number): DataFrame {
        return this._head(n);
    }

    /**
     * Renames a column in the data frame.
     *
     * @param {string} oldColumnName - The name of the column to rename.
     * @param {string} newColumnName - The new name for the column.
     * @returns {DataFrame} A new data frame with the specified column renamed.
     */
    public renameColumn(
        oldColumnName: string,
        newColumnName: string,
    ): DataFrame {
        return this._renameColumn(oldColumnName, newColumnName);
    }

    /**
     * The number of rows in the data frame.
     */
    get rows(): number {
        return this._data.length;
    }

    /**
     * Returns a new data frame with only the specified columns.
     *
     * @param {string[]} columns - An array of column names to select.
     * @returns {DataFrame} A new data frame with only the specified columns.
     */
    public select(columns: string[]): DataFrame {
        return this._select(columns);
    }

    /**
     * The shape of the data frame as a tuple of [number of rows, number of columns].
     */
    get shape(): [number, number] {
        return [this.rows, this.columns.length];
    }

    /**
     * Returns the last n rows of the data frame.
     *
     * @param {number} [n] - The number of rows to return. Defaults to 5.
     * @returns {DataFrame} A new data frame containing the last n rows of the data frame.
     */
    public tail(n?: number): DataFrame {
        return this._tail(n);
    }

    /**
    * Returns a string representation of the data frame.
    * Prints only first 5 rows and last 5 rows
    * @returns {string} A string representation of the data frame.
    */
    toString(): string {
        return this._toString();
    }


    /**
     * Returns a detailed string representation of the data frame.
     * Prints all rows.
     * @returns {string} A detailed string representation of the data frame.
     */
    public details(): string {
        return this._details();
    }



    /**
    * Writes the data frame to a CSV file.
    *
    * @param {string} [path] -The file path where the CSV file should be saved.
    * @returns {void}.
    */
    public toCSV(path: string): void {
        this._toCSV(path);
    }

    /**
     * Writes the data frame to a JSON file.
     *
     * @param {string} [path] -The file path where the JSON file should be saved.
     * @returns {void}.
     */
    public toJSON(path: string): void {
        this._toJSON(path);
    }

    abstract [Symbol.iterator](): IterableIterator<DataFrameRow>;

    protected abstract _head(n?: number): DataFrame;

    protected abstract _tail(n?: number): DataFrame;

    protected abstract _getColumnTypes(): { [column: string]: string };

    protected abstract _renameColumn(
        oldColumnName: string,
        newColumnName: string,
    ): DataFrame;

    protected abstract _dropColumn(columnName: string): DataFrame;

    protected abstract _select(columns: string[]): DataFrame;

    protected abstract _details(): string;

    protected abstract _toString(): string;

    protected abstract _toCSV(path: string): void;

    protected abstract _toJSON(path: string): void;
}
