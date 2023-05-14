import { GroupBy } from '../implementations/groupBy';
import { DataFrame } from '../index';
import { DataFrameOptions } from '../index';

describe('Testing groupBy class implementation', () => {

    let dataFrameOptions: DataFrameOptions = ({
        columns: ['name', 'age', 'gender'],
        data: [
            ['John', 30, 'male'],
            ['Jane', 25, 'female'],
            ['John', 40, 'male']
        ]
    });
    let dataFrame: DataFrame = new DataFrame(dataFrameOptions);

    it('Should return count of the group', () => {
        const groupedData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);
        expect(groupedData.count()).toEqual({ male: 2, female: 1 });
    });

    it('Should return sum of a given column in the group', () => {
        const groupedData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);
        expect(groupedData.sum('age')).toEqual({ male: 70, female: 25 });
    });

    it('Should return mean of a given column in the group', () => {
        const groupedData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);
        expect(groupedData.mean('age')).toEqual({ male: 35, female: 25 });
    });

    it('Should return max of a given column in the group', () => {
        const groupedData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);
        expect(groupedData.max('age')).toEqual({ male: 40, female: 25 });
    });

    it('Should return min of a given column in the group', () => {
        const groupedData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);
        expect(groupedData.min('age')).toEqual({ male: 30, female: 25 });
    });

});