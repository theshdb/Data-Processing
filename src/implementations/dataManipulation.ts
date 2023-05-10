import { DataFrame } from "./dataFrame";
import { DataFrameOptions, DataFrameRow, SortOrder } from '../abstractions';
import { AbstractDataManipulation } from "../abstractions/abstractDataManipulation";
import { GroupBy } from "./groupBy";


export class DataManipulation extends AbstractDataManipulation {

    addColumn(columnName: string, column1: string, column2: string): DataFrame {
        const data = this._data.map(row => [...row]); // create a copy of the existing data array

        for (let i = 0; i < this.rows; i++) {
            const value1 = this._data[i][this._columns.indexOf(column1)];
            const value2 = this._data[i][this._columns.indexOf(column2)];
            data[i].push(value1 + value2);
        }

        const columns = [...this._columns, columnName];
        return new DataFrame({ columns, data });
    }


    protected _filter(predicate: (row: DataFrameRow) => boolean): DataFrame {
        const filteredData = this._data.filter((row) => {
            const rowData: DataFrameRow = {};
            this._columns.forEach((column, columnIndex) => {
                rowData[column] = row[columnIndex];
            });

            return predicate(rowData);
        });
        return new DataFrame({ columns: this._columns, data: filteredData });
    }


    protected _gropuBy(dataFrame: DataFrame, ...columns: string[]): GroupBy {
        return new GroupBy(dataFrame, ...columns);

    }

    protected _sort(columns: string[], orders: ('asc' | 'desc')[] = []): DataFrame {

        const sortOrders: SortOrder = columns.map((column, index) => ({
            column,
            order: orders[index] || 'asc',
        }));

        const sortedData = this._data.sort((a, b) => {
            let compareResult = 0;
            for (const sortOrder of sortOrders) {
                const columnIndex = this._columns.indexOf(sortOrder.column);
                const aValue = a[columnIndex];
                const bValue = b[columnIndex];

                if (aValue > bValue) {
                    compareResult = sortOrder.order === 'asc' ? 1 : -1;
                    break;
                } else if (aValue < bValue) {
                    compareResult = sortOrder.order === 'asc' ? -1 : 1;
                    break;
                }
            }
            return compareResult;
        });

        return new DataFrame({
            columns: this._columns,
            data: sortedData,
        });
    }


}