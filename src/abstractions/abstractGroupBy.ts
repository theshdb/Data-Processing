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
     * 
     * @example
     * 
     * const count = groupedData.count(); //{ Female: 1, Male: 2 }
     */
    public count() {
        return this._count();
    }

    /**
     * Returns the sum of values in the specified column for each group.
     *
     * @param {string} column - The column to compute the sum for.
     * @returns {Object} An object with the sum of values in the specified column for each group.
     * 
     * @example
     * 
     * const sum = groupedData.sum('Age'); //{ Female: 105, Male: 90 }
     */
    public sum(column: string): { [key: string]: number } {
        return this._sum(column);
    }

    /**
     * Returns the maximum value in the specified column for each group.
     *
     * @param {string} column - The column to compute the maximum for.
     * @returns {Object} An object with the maximum value in the specified column for each group.
     * 
     * @example
     * 
     * const max = groupedData.max('Age'); //{ Female: 27, Male: 33 }
     */
    public max(column: string): { [key: string]: number } {
        return this._max(column);
    }


    /**
     * Returns the mean of values in the specified column for each group.
     *
     * @param {string} column - The column to compute the mean for.
     * @returns {Object} An object with the mean of values in the specified column for each group.
     * 
     * @example
     * 
     * const mean = groupedData.mean('Age'); //{ Female: 24.5, Male: 26 }
    */
    public mean(column: string): { [key: string]: number } {
        return this._mean(column);
    }

    /**
     * Returns the minimum value in the specified column for each group.
     *
     * @param {string} column - The column to compute the minimum for.
     * @returns {Object} An object with the minimum value in the specified column for each group.
     * 
     * @example
     * 
     * const min = groupedData.min('Age'); //{ Female: 18, Male: 21 }
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
