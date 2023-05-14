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
     *
     */
    protected abstract _data: any[][];


    /**
     * The columns in the  data frame.
     * 
     * @returns {string []} An array of column names.
     * @example
     * 
     * //Gives an array of column names.
     * const columns = df.columns; //['name', 'age', 'gender']
     */
    get columns(): string[] {
        return this._columns;
    }

    /**
     * The columns in the  data frame.
     * 
     * @returns {any [][]} A two dimensional array of data representing rows of the data frame.
     * @example
     * 
     * //Gives a 2D array .
     * const data = df.data; //[['Alice', 30, 'Female'], ['Bob', 25, 'Male'], ['Charlie', 40, 'Male']];
     */
    get data(): any[][] {
        return this._data;
    }

    /**
     * Drops a column from the data frame.
     *
     * @param {string} columnName - The name of the column to drop.
     * @returns {DataFrame} A new data frame with the specified column dropped.
     * 
     * @example
     * 
     * //Drop age column from the data frame.
     * 
     * const df = new DataFrame({
     *   columns: ['Name', 'Age', 'Gender'],
     *   data: [
     *     ['Alice', 30, 'Female'],
     *     ['Bob', 25, 'Male'],
     *     ['Charlie', 40, 'Male'],
     *   ],
     * });
     * 
     * const newDf = df.dropColumn('Age');
     * 
     * console.log(newDf.data); //[['Alice', 'Female'], ['Bob', 'Male'], ['Charlie', 'Male']]
     */
    public dropColumn(columnName: string): DataFrame {
        return this._dropColumn(columnName);
    }

    /**
     * Returns an object containing the data types of each column in the data frame.
     *
     * @returns {Object} An object containing the data types of each column.
     * 
     * @example
     * 
     * //Gives an object containing the data types of each column.
     * const columnTypes = df.getColumnTypes(); // {Name: 'string', Age: 'number', Gender: 'string'}
     */
    public getColumnTypes(): { [column: string]: string } {
        return this._getColumnTypes();
    }

    /**
     * Returns the first n rows of the data frame.
     *
     * @param {number} [n] - The number of rows to return. Defaults to 5.
     * @returns {DataFrame} A new data frame containing the first n rows of the data frame.
     * 
     * @example
     * 
     * //Give a new data frame containing the first 5 rows of the data frame.
     * const newDf = df.head(); 
     * 
     * or
     * 
     * //Give a new data frame containing the first 3 rows of the data frame.
     * const newDf = df.head(3);
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
     * 
     * @example
     * 
     * //Rename age column to newAge.
     * 
     * const newDf = df.renameColumn('Age', 'newAge');
     */

    public renameColumn(
        oldColumnName: string,
        newColumnName: string,
    ): DataFrame {
        return this._renameColumn(oldColumnName, newColumnName);
    }

    /**
     * The number of rows in the data frame.
     * 
     * @returns {number} The number of rows in the data frame.
     * 
     * @example
     * 
     * //Gives the number of rows in the data frame.
     * const rows = df.rows; //3
     */
    get rows(): number {
        return this._data.length;
    }

    /**
     * Returns a new data frame with only the specified columns.
     *
     * @param {string[]} columns - An array of column names to select.
     * @returns {DataFrame} A new data frame with only the specified columns.
     * 
     * @example
     * 
     * //Gives a new data frame with only the name and age columns.
     * 
     * const newDf = df.select(['name', 'age']);
     */
    public select(columns: string[]): DataFrame {
        return this._select(columns);
    }

    /**
     * The shape of the data frame as a tuple of [number of rows, number of columns].
     * 
     * @returns {[number, number]} A tuple of [number of rows, number of columns].
     * 
     * @example
     * const shape = df.shape; // [3, 2]
     */
    get shape(): [number, number] {
        return [this.rows, this.columns.length];
    }

    /**
     * Returns the last n rows of the data frame.
     *
     * @param {number} [n] - The number of rows to return. Defaults to 5.
     * @returns {DataFrame} A new data frame containing the last n rows of the data frame.
     * 
     * @example
     * 
     * //Give a new data frame containing the last 5 rows of the data frame.
     * const newDf = df.tail(); 
     * 
     * or
     * 
     * //Give a new data frame containing the last 3 rows of the data frame.
     * const newDf = df.tail(3);
     */
    public tail(n?: number): DataFrame {
        return this._tail(n);
    }

    /**
    * Returns a string representation of the data frame.
    * Prints only first 5 rows and last 5 rows
    * @returns {string} A string representation of the data frame.
    * 
    * @example
    * 
    * const df = new DataFrame({
    *   columns: ['Name', 'Age', 'Gender'],
    *   data: [
    *     ['Alice', 30, 'Female'],
    *     ['Bob', 25, 'Male'],
    *     ['Charlie', 40, 'Male'],
    *   ],
    * });
    * 
    * console.log(df.toString());
    * 
    * //Output:
    * 
    * DataFrame
    * Shape: (3,3)
    *
    *
    *    Name                    Age                     Gender    
    *
    *   1       Alice                   30                      Female    
    *   2       Bob                     25                      Male      
    *   3       Charlie                 40                      Male   
    * 
    */
    toString(): string {
        return this._toString();
    }


    /**
     * Returns a detailed string representation of the data frame.
     * Prints all rows.
     * @returns {string} A detailed string representation of the data frame.
     * 
     * @example
     * 
     * //Print complete rows/data of the data frame.
     * console.log(df.details());
     */
    public details(): string {
        return this._details();
    }



    /**
    * Writes the data frame to a CSV file.
    *
    * @param {string} [path] -The file path where the CSV file should be saved.
    * @returns {void}.
    * 
    * @example
    * 
    * //Write the data frame to a CSV file.
    * df.toCSV('path/to/file.csv');
    */
    public toCSV(path: string): void {
        this._toCSV(path);
    }

    /**
     * Writes the data frame to a JSON file.
     *
     * @param {string} [path] -The file path where the JSON file should be saved.
     * @returns {void}.
     * 
     * @example
     * 
     * //Write the data frame to a JSON file.
     * df.toJSON('path/to/file.json');
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
