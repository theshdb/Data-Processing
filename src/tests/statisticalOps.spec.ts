import { DataFrame } from '../index';
import { DataFrameOptions } from '../index';

describe('Testing groupBy class implementation', () => {

    let dataFrameOptions: DataFrameOptions = ({
        columns: ['name', 'age', 'gender', 'marks'],
        data: [
            ['John', 30, 'male', 60],
            ['Jane', 25, 'female', 70],
            ['John', 40, 'male', 80],
            ['Jane', 30, 'female', 90]
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

    it('Should return correlation for the given columns of a dataframe', () => {
        let result = dataFrame.correlation('age', 'marks');
        expect(result).toEqual(0.31);

    });
});