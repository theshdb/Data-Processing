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
