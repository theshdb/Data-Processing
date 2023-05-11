import { AbstractFileIO } from '../abstractions/abstractFileIO';
import { DataFrameStructure } from './dataFrameStructure';
import fs from "fs";

export class FileIO extends AbstractFileIO {

    protected _fromCSV(path: string): DataFrameStructure {
        const data: string = fs.readFileSync(path, { encoding: "utf-8" });
        const lines: string[] = data.trim().split("\n");
        const columns = lines.shift()?.split(",");
        if (!columns) {
            throw new Error("No data in the file");
        }

        const rows = lines.map((line) => {
            return line.split(",");
        });

        const dataFrameStructure: DataFrameStructure = new DataFrameStructure({ columns: columns, data: rows })

        return dataFrameStructure
    }

    protected _fromJSON(path: string): DataFrameStructure {
        const data: string = fs.readFileSync(path, { encoding: "utf-8" });
        const json = JSON.parse(data);
        let rows: any[][] = [];
        const columns = Object.keys(json[0]);

        for (const key in json) {
            let row = Object.values(json[key]);
            rows.push(row);
        }
        const dataFrameStructure: DataFrameStructure = new DataFrameStructure({ columns: columns, data: rows })
        return dataFrameStructure
    }




}