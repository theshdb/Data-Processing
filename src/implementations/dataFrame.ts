import * as fs from 'fs';
import { DataFrameOptions } from '../abstractions/interfaces';
import { StatisticalOps } from './statisticalOps';

export class DataFrame extends StatisticalOps {

    /**
     * Creates a new DataFrame instance.
     *
     * @constructor
     * @param {DataFrameOptions} options - The options for creating the DataFrame.
     *
     * @example
     * const df = new DataFrame({
     *   columns: ['Name', 'Age', 'Gender'],
     *   data: [
     *     ['Alice', 30, 'Female'],
     *     ['Bob', 25, 'Male'],
     *     ['Charlie', 40, 'Male'],
     *   ],
     * });
     */
    constructor(options: DataFrameOptions) {

        //In this code block we are doing a row wise check where we are storing the last row data types for all columns and 
        // then comparing it with the current row data types. If the data types are not the same then we throw an error.


        // let lastRowDataTypes: string[] = [];
        // for (let i = 0; i < options.data.length; i++) {

        //     let currentRowDataTypes: string[] = [];
        //     for (let j = 0; j < options.data[i].length; j++) {

        //         currentRowDataTypes.push(typeof options.data[i][j])
        //     }

        //     if (lastRowDataTypes.length == 0) {
        //         lastRowDataTypes = currentRowDataTypes;
        //     } else {
        //         for (let i = 0; i < lastRowDataTypes.length; i++) {
        //             if (lastRowDataTypes[i] !== currentRowDataTypes[i]) {
        //                 let columns = options.columns[i]
        //                 throw new Error(`Column ${options.columns[i]} has ${currentRowDataTypes[i]} as it's data type.`)
        //             }
        //         }
        //     }
        // }



        // In this code block we are doing a column wise check where we are storing the all the possible data types for a 
        // column and after reading the wole data we inspect whether we got more than one data type for any column if we do
        // so then we throw an error.

        let columnTypes: { [key: string]: { [key: string]: number } } = {};

        for (let i = 0; i < options.columns.length; i++) {
            columnTypes[options.columns[i]] = {};
        }

        for (let i = 0; i < options.data.length; i++) {
            for (let j = 0; j < options.data[i].length; j++) {
                let dataType = typeof options.data[i][j];
                if (columnTypes[options.columns[j]][dataType] == undefined) {
                    columnTypes[options.columns[j]][dataType] = 1;
                } else {
                    columnTypes[options.columns[j]][dataType]++;
                }
            }
        }

        let typeErrors: string[] = [];
        for (const column in columnTypes) {
            if (Object.keys(columnTypes[column]).length > 1) {
                const expectedType: string | undefined = Object.keys(columnTypes[column]).find(key => columnTypes[column][key] === Math.max(...Object.values(columnTypes[column])));

                delete columnTypes[column][expectedType!];

                const otherTypes: string = Object.keys(columnTypes[column]).join(', ');
                const otherTypesCount: string = Object.values(columnTypes[column]).join(', ');
                typeErrors.push(`Expected ${expectedType} data type for column ${column} but got ${otherTypes} data type instances with respective occurances ${otherTypesCount}.`);
            }
        }

        if (typeErrors.length > 0) {
            throw new Error(typeErrors.join('\n\t'));
        }

        super(options);
    }

    /**
    * Creates a new DataFrame from a JSON file.
    *
    * @param {string} path - The path to the JSON file.
    * @returns {DataFrame} A new DataFrame object with the data from the JSON file.
    * @throws {Error} If the JSON file cannot be read or parsed.
    * @example
    *
    * // Create a new DataFrame from a JSON file
    * const df = DataFrame.fromJSON('path/to/file.json');
    */
    static fromJSON(path: string): DataFrame {
        let data: string = fs.readFileSync(path, { encoding: 'utf-8' });
        data = data.replace(/\r/g, '');
        const json = JSON.parse(data);
        const rows: any[][] = [];
        const columns = Object.keys(json[0]);

        for (const key in json) {
            const row = Object.values(json[key]);
            rows.push(row);
        }
        const dataFrame: DataFrame = new DataFrame({
            columns: columns,
            data: rows,
        });
        return dataFrame;
    }


    /**
     * Creates a new DataFrame from a CSV file.
     *
     * @static
     * @param {string} path - The path to the CSV file.
     * @returns {DataFrame} A new DataFrame object containing the data from the CSV file.
     * @throws {Error} If the CSV file is empty.
     * 
     * @example
     *
     * // Create a new DataFrame from a CSV file
     * const df = DataFrame.fromCSV('path/to/file.csv');
    */
    static fromCSV(path: string): DataFrame {
        let data: string = fs.readFileSync(path, { encoding: 'utf-8' });
        data = data.replace(/\r/g, '');
        const lines: string[] = data.trim().split('\n');
        const columns = lines.shift()?.split(',');
        if (!columns) {
            throw new Error('No data in the file');
        }

        const rows = lines.map((line) => {
            return line.split(',');
        });

        const dataFrame: DataFrame = new DataFrame({
            columns: columns,
            data: rows,
        });

        return dataFrame;
    }
}
