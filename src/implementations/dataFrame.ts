import { DataFrameOptions, DataFrameRow } from '../abstractions/data_frame';
import { DataFrame } from '../abstractions/data_frame/dataFrame';
import { DataFrameOperations } from '../abstractions/data_frame/dataFrameOperations';

export class DataFrameClass extends DataFrameOperations {

    constructor(options: DataFrameOptions) {
        super(options)
    }

    // get columns(): string[] {
    //     return super._columns;
    // }

    // get rows(): number {
    //     return super._data.length;
    // }

    [Symbol.iterator](): IterableIterator<DataFrameRow> {
        let index = 0;
        let self = {
            rows: super.rows,
            data: super.rawData,
            columns: super.columns,
        }

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

    head(n: number): DataFrame {
        const slicedData = this._data.slice(0, n);
        return new DataFrame({ columns: this._columns, data: slicedData });
    }

    tail(n: number): DataFrame {
        const slicedData = this._data.slice(-n);
        return new DataFrame({ columns: this._columns, data: slicedData });
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


    renameColumn(oldColumnName: string, newColumnName: string): DataFrame {
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
    dropColumn(columnName: string): DataFrame {
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
    select(...columns: string[]): DataFrame {
        const selectedColumns = this._columns.filter((col) => columns.includes(col));
        const selectedData = this._data.map((row) => row.filter((_, idx) =>
            columns.includes(this._columns[idx])));
        return new DataFrame({ columns: selectedColumns, data: selectedData });
    }
}