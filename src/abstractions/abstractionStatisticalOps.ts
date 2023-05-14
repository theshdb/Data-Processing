import { DataManipulation } from '../implementations/dataManipulation';

/**
 * Abstract class that defines statistical operations on a DataFrame.
 */
export abstract class AbstractionStatisticalOps extends DataManipulation {

    /**
     * Calculates the mean of the given columns.
     *
     * @param {string[]} columns - The columns to calculate the mean of.
     * @returns {Object} An object where the keys are the column names and the values are the means.
     * 
     * @example
     * const mean = df.mean(['age']); // { age: 47.5 }
     */
    public mean(columns: string[]): { [key: string]: number } {
        return this._mean(columns);
    }

    /**
     * Calculates the median of the given columns.
     *
     * @param {string[]} columns - The columns to calculate the median of.
     * @returns {Object} An object where the keys are the column names and the values are the medians.
     * 
     * @example
     * const median = df.median(['age']); // { age: 47 }
     
     */
    public median(columns: string[]): { [key: string]: number } {
        return this._median(columns);
    }

    /**
     * Calculates the mode of the given columns.
     *
     * @param {string[]} columns - The columns to calculate the mode of.
     * @returns {Object} An object where the keys are the column names and the values are the modes.
     * 
     * @example
     * const mode = df.mode(['age']); // { age: 47 }
     
     */
    public mode(columns: string[]): { [key: string]: number } {
        return this._mode(columns);
    }

    /**
     * Calculates the standard deviation of the given columns.
     *
     * @param {string[]} columns - The columns to calculate the standard deviation of.
     * @returns {Object} An object where the keys are the column names and the values are the standard deviations.
     * 
     * @example
     * const standardDeviation = df.standardDeviation(['age']); // { age: 4.5 }
     
     */
    public standardDeviation(columns: string[]): { [key: string]: number } {
        return this._standardDeviation(columns);
    }

    protected abstract _mean(columns: string[]): { [key: string]: number };

    protected abstract _median(columns: string[]): { [key: string]: number };

    protected abstract _mode(columns: string[]): { [key: string]: number };

    protected abstract _standardDeviation(columns: string[]): {
        [key: string]: number;
    };
}
