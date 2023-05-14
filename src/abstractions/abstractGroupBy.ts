import { GroupedData } from './interfaces';


/*
 * A class for performing group by operations on a dataset.
 */
export abstract class AbstractGroupBy {
    /**
     * The data grouped by the specified columns.
     */
    protected _groupedData: GroupedData;

    /**
     * Constructs a new instance of the AbstractGroupBy class.
     *
     * @param {GroupedData} groups - The data grouped by the specified columns.
     */
    constructor(groups: GroupedData) {
        this._groupedData = groups;
    }

    /**
     * Returns the grouped data.
     *
     * @returns {GroupedData} The grouped data.
    */
    get groupedData(): GroupedData {
        return this._groupedData;
    }

    /**
     * Returns the count of records in each group.
     *
     * @returns {Object} An object with the count of records in each group.
     */
    public count() {
        return this._count();
    }

    /**
     * Returns the sum of values in the specified column for each group.
     *
     * @param {string} column - The column to compute the sum for.
     * @returns {Object} An object with the sum of values in the specified column for each group.
     */
    public sum(column: string): { [key: string]: number } {
        return this._sum(column);
    }

    /**
     * Returns the maximum value in the specified column for each group.
     *
     * @param {string} column - The column to compute the maximum for.
     * @returns {Object} An object with the maximum value in the specified column for each group.
     */
    public max(column: string): { [key: string]: number } {
        return this._max(column);
    }


    /**
     * Returns the mean of values in the specified column for each group.
     *
     * @param {string} column - The column to compute the mean for.
     * @returns {Object} An object with the mean of values in the specified column for each group.
    */
    public mean(column: string): { [key: string]: number } {
        return this._mean(column);
    }

    /**
     * Returns the minimum value in the specified column for each group.
     *
     * @param {string} column - The column to compute the minimum for.
     * @returns {Object} An object with the minimum value in the specified column for each group.
     */
    public min(column: string): { [key: string]: number } {
        return this._min(column);
    }

    protected abstract _count(): { [key: string]: number };

    protected abstract _max(column: string): { [key: string]: number };

    protected abstract _mean(column: string): { [key: string]: number };

    protected abstract _min(column: string): { [key: string]: number };

    protected abstract _sum(column: string): { [key: string]: number };
}
