import { DataFrameIterator, DataFrameOptions, DataFrameRow } from '../abstractions/data_frame';
import { DataFrame } from '../abstractions/data_frame/dataFrame';

export class DataFrameOperations extends DataFrame {

    constructor(options: DataFrameOptions) {
        super(options)
    }

    get columns(): string[] {
        return this._columns;
    }

    get rows(): number {
        return this._data.length;
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

    head(n: number): DataFrameOperations {
        const slicedData = this._data.slice(0, n);
        return new DataFrameOperations({ columns: this._columns, data: slicedData });
    }

    tail(n: number): DataFrameOperations {
        const slicedData = this._data.slice(-n);
        return new DataFrameOperations({ columns: this._columns, data: slicedData });
    }

    getColumnTypes(): { [column: string]: string; } {
        const columnTypes: { [column: string]: string } = {};
        // Check type of each element in the first row of the data 

        this._columns.forEach((column, columnIndex) => {
            const dataType = typeof this._data[0][columnIndex];
            columnTypes[column] = dataType;
        });
        return columnTypes;
    }


    renameColumn(oldColumnName: string, newColumnName: string): DataFrameOperations {
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

        return new DataFrameOperations({ columns: newColumns, data: newData });
    }
    dropColumn(columnName: string): DataFrameOperations {
        const columnIdx = this._columns.indexOf(columnName);
        if (columnIdx === -1) {
            throw new Error(`Column ${columnName} not found.`);
        }

        const newColumns = this._columns.filter((col) => col !== columnName);
        const newData = this._data.map((row) => {
            const newRow = [...row]; newRow.splice(columnIdx, 1);
            return newRow;
        });

        return new DataFrameOperations({ columns: newColumns, data: newData });
    }
    select(...columns: string[]): DataFrameOperations {
        const selectedColumns = this._columns.filter((col) => columns.includes(col));
        const selectedData = this._data.map((row) => row.filter((_, idx) =>
            columns.includes(this._columns[idx])));
        return new DataFrameOperations({ columns: selectedColumns, data: selectedData });
    }
}