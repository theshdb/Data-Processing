import { AbstractionStatisticalOps } from "../abstractions/abstractionStatisticalOps";

export class StatisticalOps extends AbstractionStatisticalOps {

    protected _mean(columns: string[]): { [key: string]: number; } {
        const result: { [key: string]: number } = {};

        for (const column of columns) {
            let sum = 0
            //loop through each row and sum the value of the column
            for (const row of this.data) {
                sum += row[this.columns.indexOf(column)]
            }
            result[column] = sum / this.data.length
        }
        return result;
    }

    protected _median(columns: string[]): { [key: string]: number; } {
        const result: { [key: string]: number } = {};

        for (const column of columns) {
            const sorted = this.data.sort((a, b) => a[this.columns.indexOf(column)] - b[this.columns.indexOf(column)]);
            result[column] = sorted[Math.floor(sorted.length / 2)][this.columns.indexOf(column)];
        }
        return result;
    }

    protected _mode(columns: string[]): { [key: string]: number; } {
        const result: { [key: string]: number } = {};
        const map = new Map<number, number>();

        for (const column of columns) {
            for (const row of this.data) {
                map.set(row[this.columns.indexOf(column)], (map.get(row[this.columns.indexOf(column)]) || 0) + 1);
            }

            let max: number = 0;
            let mode: number = 0;

            for (let [key, value] of map) {
                if (value > max) {
                    max = value;
                    mode = key;
                }
            }
            result[column] = mode;
        }
        return result;

    }

    protected _standardDeviation(columns: string[]): { [key: string]: number; } {
        const result: { [key: string]: number } = {};
        const mean = this._mean(columns);

        for (const column of columns) {
            let sum = 0;
            for (const row of this.data) {
                sum += Math.pow(row[this.columns.indexOf(column)] - mean[column], 2);
            }
            result[column] = Math.sqrt(sum / this.data.length);
        }
        return result;
    }

}



