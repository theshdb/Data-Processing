import { GroupedData } from "../abstractions";
import { AbstractGroupBy } from "../abstractions/abstractGroupBy";
import { DataFrame } from "./dataFrame";

export class GroupBy extends AbstractGroupBy {

    constructor(dataFrame: DataFrame, ...columns: string[]) {

        const groups: GroupedData = {};

        const groupByColumns = (data: any[][], groupByColumns: string[]): Map<string, any[][]> => {
            const map = new Map<string, any[][]>();

            data.forEach((row) => {
                const key = groupByColumns.map((column) => row[dataFrame.columns.indexOf(column)]).join(',');

                if (!map.has(key)) {
                    map.set(key, []);
                }

                map.get(key)?.push(row);
            });

            return map;
        };

        const groupedData = groupByColumns(dataFrame.data, columns);

        groupedData.forEach((groupData, key) => {
            groups[key] = new DataFrame({ columns: dataFrame.columns, data: groupData });
        });

        super(groups)
    }

    protected _count(): { [key: string]: number } {
        let result: { [key: string]: number } = {};
        const keys = Object.keys(this.groupedData)

        for (const key of keys) {
            const currentDataFrame = this.groupedData[key];
            result[key.toString()] = currentDataFrame.data.length
        }
        return result;
    }

    protected _mean(column: string): { [key: string]: number; } {
        let result: { [key: string]: number; } = {};
        const keys = Object.keys(this.groupedData)

        for (const key of keys) {
            let sum = 0
            const currentDataFrame = this.groupedData[key];
            //loop through each row and sum the value of the column
            for (const row of currentDataFrame.data) {
                sum += row[currentDataFrame.columns.indexOf(column)]
            }
            result[key.toString()] = sum / currentDataFrame.data.length
        }
        return result;
    }




    protected _sum(columnName: string): { [key: string]: number } {
        let result: { [key: string]: number } = {};
        const keys = Object.keys(this.groupedData)

        for (const key of keys) {
            let sum = 0
            const currentDataFrame = this.groupedData[key];
            //loop through each row and sum the value of the column
            for (const row of currentDataFrame.data) {
                sum += row[currentDataFrame.columns.indexOf(columnName)]
            }
            result[key.toString()] = sum
        }
        return result;
    }

}