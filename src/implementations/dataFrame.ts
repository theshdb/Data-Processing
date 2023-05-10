import { DataFrameOptions, DataFrameRow } from '../abstractions';
import { AbstractDataFrame } from '../abstractions/abstractDataFrame';

export class DataFrame extends AbstractDataFrame {

    constructor(options: DataFrameOptions) {
        super(options)
    }

    [Symbol.iterator](): IterableIterator<DataFrameRow> {
        let index = 0;
        const self = this;

        function* generator() {
            while (index < self.rows) {
                const row: DataFrameRow = {};

                self._columns.forEach((column, columnIndex) => {
                    row[column] = self._data[index][columnIndex];
                });

                index++;

                yield row;
            }
        }

        return generator();
    }

    protected _head(n: number): DataFrame {
        const slicedData = this._data.slice(0, n ?? 5);
        return new DataFrame({ columns: this._columns, data: slicedData });
    }

    protected _tail(n: number): DataFrame {
        const slicedData = this._data.slice(-n ?? 5);
        return new DataFrame({ columns: this._columns, data: slicedData });
    }

    protected _getColumnTypes(): { [column: string]: string; } {
        const columnTypes: { [column: string]: string } = {};
        // Check type of each element in the first row of the data 

        this._columns.forEach((column, columnIndex) => {
            const dataType = typeof this._data[0][columnIndex];
            columnTypes[column] = dataType;
        });
        return columnTypes;
    }

    protected _renameColumn(oldColumnName: string, newColumnName: string): DataFrame {
        const columnIdx = this._columns.indexOf(oldColumnName);
        if (columnIdx === -1) {
            throw new Error(`Column ${oldColumnName} not found.`);
        }
        const newColumns = [...this._columns];
        newColumns[columnIdx] = newColumnName;

        const newData = this._data.map((row) => {
            const newRow = [...row]; newRow[columnIdx] = row[columnIdx];
            return newRow;
        });

        return new DataFrame({ columns: newColumns, data: newData });
    }

    protected _dropColumn(columnName: string): DataFrame {
        const columnIdx = this._columns.indexOf(columnName);
        if (columnIdx === -1) {
            throw new Error(`Column ${columnName} not found.`);
        }

        const newColumns = this._columns.filter((col) => col !== columnName);
        const newData = this._data.map((row) => {
            const newRow = [...row]; newRow.splice(columnIdx, 1);
            return newRow;
        });

        return new DataFrame({ columns: newColumns, data: newData });
    }

    protected _select(...columns: string[]): DataFrame {
        const selectedColumns = this._columns.filter((col) => columns.includes(col));
        const selectedData = this._data.map((row) => row.filter((_, idx) =>
            columns.includes(this._columns[idx])));
        return new DataFrame({ columns: selectedColumns, data: selectedData });
    }


    protected _toString(): string {
        const header = '\t' + this._columns.map(element => element.toString().padEnd(10, ' ')).join('\t\t');

        const rows = this._data
            .map(row => row.map(element => element.toString().padEnd(10, ' ')).join('\t\t'))
            .map((str, index) => `${index + 1}\t${str}`)
            .join('\n');
        return `${header}\n\n${rows}`;
    }
}