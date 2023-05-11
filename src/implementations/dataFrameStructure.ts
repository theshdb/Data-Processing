import { DataFrameOptions, DataFrameRow } from '../abstractions';
import { AbstractDataFrameStructure } from '../abstractions/abstractDataFrame';
import fs from 'fs';

export class DataFrameStructure extends AbstractDataFrameStructure {

    protected _columns: string[];
    protected _data: any[][];

    constructor(options: DataFrameOptions) {
        super()
        this._columns = options.columns;
        this._data = options.data;
    }

    [Symbol.iterator](): IterableIterator<DataFrameRow> {
        let index = 0;
        const self = this;

        function* generator() {
            while (index < self.rows) {
                const row: DataFrameRow = {};

                self.columns.forEach((column, columnIndex) => {
                    row[column] = self.data[index][columnIndex];
                });

                index++;

                yield row;
            }
        }

        return generator();
    }

    protected _head(n: number): DataFrameStructure {
        const slicedData = this.data.slice(0, n ?? 5);
        return new DataFrameStructure({ columns: this.columns, data: slicedData });
    }

    protected _tail(n: number): DataFrameStructure {
        const slicedData = this.data.slice(-n ?? 5);
        return new DataFrameStructure({ columns: this.columns, data: slicedData });
    }

    protected _getColumnTypes(): { [column: string]: string } {
        const columnTypes: { [column: string]: string } = {};
        // Check type of each element in the first row of the data 

        this.columns.forEach((column, columnIndex) => {
            const dataType = typeof this.data[0][columnIndex];
            columnTypes[column] = dataType;
        });
        return columnTypes;
    }

    protected _renameColumn(oldColumnName: string, newColumnName: string): DataFrameStructure {
        const columnIdx = this.columns.indexOf(oldColumnName);
        if (columnIdx === -1) {
            throw new Error(`Column ${oldColumnName} not found.`);
        }
        const newColumns = [...this.columns];
        newColumns[columnIdx] = newColumnName;

        const newData = this.data.map((row) => {
            const newRow = [...row]; newRow[columnIdx] = row[columnIdx];
            return newRow;
        });

        return new DataFrameStructure({ columns: newColumns, data: newData });
    }

    protected _dropColumn(columnName: string): DataFrameStructure {
        const columnIdx = this.columns.indexOf(columnName);
        if (columnIdx === -1) {
            throw new Error(`Column ${columnName} not found.`);
        }

        const newColumns = this.columns.filter((col) => col !== columnName);
        const newData = this.data.map((row) => {
            const newRow = [...row]; newRow.splice(columnIdx, 1);
            return newRow;
        });

        return new DataFrameStructure({ columns: newColumns, data: newData });
    }

    protected _select(...columns: string[]): DataFrameStructure {
        const selectedColumns = this.columns.filter((col) => columns.includes(col));
        const selectedData = this.data.map((row) => row.filter((_, idx) =>
            columns.includes(this.columns[idx])));
        return new DataFrameStructure({ columns: selectedColumns, data: selectedData });
    }


    protected _details(): string {
        const header = '\t' + this.columns.map(element => element.toString().padEnd(10, ' ')).join('\t\t');

        const rows = this.data
            .map(row => row.map(element => element.toString().replace(/\r/g, '').padEnd(10, ' ')).join('\t\t'))
            .map((str, index) => `${index + 1}\t${str}`)
            .join('\n');
        return `${header}\n\n${rows}`;
    }

    protected _toString(): string {
        let rows = '';
        const maxRows = 10;
        const numRows = this.data.length;
        const numCols = this.columns.length;
        const shape = `(${numRows}, ${numCols})`;

        if (numRows < 10) {
            rows = this._details();

            return `DataFrame\nShape: ${shape}\n\n\n${rows}`;
        }


        // Show the first 5 rows
        for (let i = 0; i < Math.min(maxRows, numRows); i++) {
            rows += (i + 1) + '\t' + this.data[i].map(element => element.toString().replace(/\r/g, '').padEnd(10, ' ')).join('\t\t') + '\n';
        }

        // Show "..." if there are more rows than what's shown
        if (numRows > maxRows) {
            rows += '...\n';
        }

        // Show the last 5 rows
        for (let i = Math.max(0, numRows - maxRows); i < numRows; i++) {
            rows += (i + 1) + '\t' + this.data[i].map(element => element.toString().replace(/\r/g, '').padEnd(10, ' ')).join('\t\t') + '\n';
        }

        return `DataFrame\nShape: ${shape}\n${this.columns.join('\t\t')}\n\n\n${rows}`;
    }

    protected _toJSON(path: string): void {
        let jsonData: any = [];

        for (const row of this.data) {
            let rowObj: { [key: string]: any } = {};
            for (const col in this.columns) {
                rowObj[this.columns[col]] = row[col];
            }
            jsonData.push(rowObj);
        }

        fs.writeFile(path, JSON.stringify(jsonData), (err) => {
            if (err) {
                throw err;
            }
        });
    }

    protected _toCSV(path: string): void {
        let data = [this.columns]
        data = [...data, ...this.data]
        const csv = data.map(row => row.join(',')).join('\n');

        fs.writeFileSync(path, csv);
    }
}