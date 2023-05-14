import { DataFrame } from '../implementations/dataFrame';

/**
 * Options for creating a DataFrame.
 */
export interface DataFrameOptions {
    /**
     * An array of column names.
     */
    columns: string[];

    /**
     * A two-dimensional array of data.
     * Each inner array represents a row of data.
     */
    data: any[][];
}

/**
 * Represents a row in a DataFrame.
 * The keys of this object correspond to the column names of the DataFrame.
 */
export interface DataFrameRow {
    [column: string]: any;
}


/**
 * An iterator that can be used to loop over the rows in a DataFrame.
 */
export interface DataFrameIterator {
    [Symbol.iterator](): IterableIterator<DataFrameRow>;
}

/**
 * A column to sort by and the order in which to sort it.
 */
export interface SortColumn {
    /**
     * The name of the column to sort by.
     */
    column: string;

    /**
     * The order in which to sort the column.
     * Can be either "asc" (ascending) or "desc" (descending).
     */
    order: 'asc' | 'desc';
}


/**
 * An array of SortColumns that represents the order in which to sort the DataFrame.
 * The first column in the array takes precedence over subsequent columns.
 */
export type SortOrder = SortColumn[];


/**
 * An object whose keys are the values of the column(s) used to group the data.
 * The values of this object are DataFrames containing the rows of data that belong to each group.
 */
export interface GroupedData {
    [key: string]: DataFrame;
}
