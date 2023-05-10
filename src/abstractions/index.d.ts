import { DataFrame } from "../implementations/dataFrame";

export interface DataFrameOptions {
    columns: string[];
    data: any[][];
}

export interface DataFrameRow {
    [column: string]: any;
}

export interface DataFrameIterator {
    [Symbol.iterator](): IterableIterator<DataFrameRow>;
}

export interface SortColumn {
    column: string;
    order: 'asc' | 'desc';
}

export type SortOrder = SortColumn[];

export interface GroupedData {
    [key: string]: DataFrame;
}