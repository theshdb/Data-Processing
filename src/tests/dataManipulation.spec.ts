import { DataFrameOptions } from '../abstractions/interfaces';
import { DataFrame } from '../implementations/dataFrame'
import { GroupBy } from '../implementations/groupBy';

describe('Testing dataManipulation class', () => {

    let dataFrameOptions: DataFrameOptions = {
        columns: ['name', 'age', 'gender', 'marks'],
        data: [
            ['John', 25, 'male', 80],
            ['Jane', 30, 'female', 70],
            ['Jack', 35, 'male', 60]
        ]
    }

    let dataFrame: DataFrame = new DataFrame(dataFrameOptions);

    it('Should return a new dataFrame by adding data of provided two columns into a new column', () => {
        const newDataFrame: DataFrame = dataFrame.addColumns('age+marks', 'age', 'marks');

        expect(newDataFrame.columns).toEqual(['name', 'age', 'gender', 'marks', 'age+marks']);
        expect(newDataFrame.data[0]).toEqual(['John', 25, 'male', 80, 105]);
    });

    it('Should return a new dataFrame with applied filter', () => {
        const newDataFrame: DataFrame = dataFrame.filter('age', 25);

        expect(newDataFrame.columns).toEqual(['name', 'age', 'gender', 'marks']);
        expect(newDataFrame.data).toEqual([['John', 25, 'male', 80]]);
    });

    it('should return a new dataFrame with applied sort', () => {
        const newDataFrame: DataFrame = dataFrame.sort(['age'], ['desc']);

        expect(newDataFrame.columns).toEqual(['name', 'age', 'gender', 'marks']);
        expect(newDataFrame.data).toEqual([['Jack', 35, 'male', 60], ['Jane', 30, 'female', 70], ['John', 25, 'male', 80]]);
    });

    it('should return a new dataFrame with applied group', () => {
        const groupByData: GroupBy = dataFrame.groupBy(dataFrame, ['gender']);

        expect(Object.keys(groupByData.groupedData)).toEqual(['male', 'female']);
        expect(groupByData.groupedData['male'].data).toEqual([['Jack', 35, 'male', 60], ['John', 25, 'male', 80]]);
        expect(groupByData.groupedData['female'].data).toEqual([['Jane', 30, 'female', 70]]);
    });

});
