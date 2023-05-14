import { DataFrame } from '../index';
import { DataFrameOptions } from '../index';

describe('Testing groupBy class implementation', () => {

    let dataFrameOptions: DataFrameOptions = ({
        columns: ['name', 'age', 'gender'],
        data: [
            ['John', 30, 'male'],
            ['Jane', 25, 'female'],
            ['John', 40, 'male'],
            ['Jane', 30, 'female']
        ]

    });
    let dataFrame: DataFrame = new DataFrame(dataFrameOptions);

    it('Should return mean for the given columns of a dataframe', () => {
        let result = dataFrame.mean(['age']);
        expect(result).toEqual({ age: 31.25 });
    });

    it('Should return median for the given columns of a dataframe', () => {
        let result = dataFrame.median(['age']);
        expect(result).toEqual({ age: 30 });
    });

    it('Should return mode for the given columns of a dataframe', () => {
        let result = dataFrame.mode(['age']);
        expect(result).toEqual({ age: 30 });
    });
});