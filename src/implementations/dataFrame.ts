import * as fs from 'fs';
import { DataFrameOptions } from '../abstractions/interfaces';
import { StatisticalOps } from './statisticalOps';

export class DataFrame extends StatisticalOps {
    constructor(options: DataFrameOptions) {
        super(options);
    }

    /**
    * Creates a new DataFrame from a JSON file.
    *
    * @param {string} path - The path to the JSON file.
    * @returns {DataFrame} A new DataFrame object with the data from the JSON file.
    * @throws {Error} If the JSON file cannot be read or parsed.
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
