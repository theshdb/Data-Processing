import { SortOrder } from '../abstractions';
import { AbstractDataManipulation } from '../abstractions/abstractDataManipulation';
import DataFrame from '../implementations/dataFrame';
import { GroupBy } from './groupBy';

export class DataManipulation extends AbstractDataManipulation {
    protected _addColumns(
        columnName: string,
        column1: string,
        column2: string,
    ): DataFrame {
        const data = this.data.map((row) => [...row]);

        for (let i = 0; i < this.rows; i++) {
            const value1 = this.data[i][this.columns.indexOf(column1)];
            const value2 = this.data[i][this.columns.indexOf(column2)];
            data[i].push(value1 + value2);
        }

        const columns = [...this.columns, columnName];
        return new DataFrame({ columns, data });
    }

    protected _filter(column: string, value: string | number): DataFrame {

        const rows: any[][] = []

        for (const row of this.data) {
            if (row[this.columns.indexOf(column)] === value) {
                rows.push(row)
            }
        }
        return new DataFrame({ columns: this.columns, data: rows });
    }

    protected _groupBy(dataFrame: DataFrame, columns: string[]): GroupBy {
        return new GroupBy(dataFrame, columns);
    }

    protected _sort(
        columns: string[],
        orders: ('asc' | 'desc')[] = [],
    ): DataFrame {
        const sortOrders: SortOrder = columns.map((column, index) => ({
            column,
            order: orders[index] || 'asc',
        }));

        const sortedData = this.data.sort((a, b) => {
            let compareResult = 0;
            for (const sortOrder of sortOrders) {
                const columnIndex = this.columns.indexOf(sortOrder.column);
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
            columns: this.columns,
            data: sortedData,
        });
    }
}
