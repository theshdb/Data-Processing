import { DataFrameOptions } from "../abstractions";
import { StatisticalOps } from "./statisticalOps";
import fs from "fs";

export default class DataFrame extends StatisticalOps {

    constructor(options: DataFrameOptions) {
        super(options);
    }

    static fromJSON(path: string): DataFrame {
        let data: string = fs.readFileSync(path, { encoding: "utf-8" });
        data = data.replace(/\r/g, '')
        const json = JSON.parse(data);
        let rows: any[][] = [];
        const columns = Object.keys(json[0]);

        for (const key in json) {
            let row = Object.values(json[key]);
            rows.push(row);
        }
        const dataFrame: DataFrame = new DataFrame({ columns: columns, data: rows })
        return dataFrame
    }

    static fromCSV(path: string): DataFrame {
        let data: string = fs.readFileSync(path, { encoding: "utf-8" });
        data = data.replace(/\r/g, '')
        const lines: string[] = data.trim().split("\n");
        const columns = lines.shift()?.split(",");
        if (!columns) {
            throw new Error("No data in the file");
        }

        const rows = lines.map((line) => {
            return line.split(",");
        });

        const dataFrame: DataFrame = new DataFrame({ columns: columns, data: rows })

        return dataFrame
    }
}

