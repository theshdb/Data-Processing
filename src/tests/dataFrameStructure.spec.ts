import { DataFrameOptions } from '../index';
import { DataFrame } from '../index';
import { DataFrameStructure } from '../implementations/dataFrameStructure';
import fs from 'fs'

describe('Testing DataFrameStructure implementation class', () => {
    let mockWriteFileSync: jest.SpyInstance
    let mockWriteFile: jest.SpyInstance
    let dataFrame: DataFrameStructure;

    beforeAll(() => {
        dataFrame = new DataFrameStructure(dataFrameOptions);
        mockWriteFileSync = jest.spyOn(fs, 'writeFileSync');
        mockWriteFile = jest.spyOn(fs, 'writeFile');
    })

    beforeEach(() => {
        mockWriteFileSync.mockClear();
        mockWriteFile.mockClear();
    })

    afterAll(() => {
        mockWriteFileSync.mockRestore();
        mockWriteFile.mockRestore();
    })

    let dataFrameOptions: DataFrameOptions = {
        columns: ['id', 'name', 'age'],
        data: [
            [1, 'John', 30],
            [2, 'Jane', 25],
            [3, 'Joe', 40]
        ]
    };

    it('should create a new instance', () => {
        expect(dataFrame).toBeDefined();
    });

    describe('Test head method', () => {
        let testHeadDataFrame: DataFrame;
        beforeAll(() => {
            let testDataFrameOptions: DataFrameOptions = {
                columns: dataFrameOptions.columns,
                data: dataFrameOptions.data.slice(0, 2)
            }
            testHeadDataFrame = new DataFrame(testDataFrameOptions);
        });

        it('Should return top n rows', () => {
            const head: DataFrame = dataFrame.head(2);

            expect(head.data).toEqual(testHeadDataFrame.data);
            expect(head.columns).toEqual(testHeadDataFrame.columns);
        });

        it('Should return top 5 rows if n value is not given', () => {
            const head: DataFrame = dataFrame.head();

            expect(head.data).toEqual(dataFrame.data);
            expect(head.data).not.toEqual(testHeadDataFrame.data);
            expect(head.columns).toEqual(dataFrame.columns);
        });
    });

    describe('Test tail method', () => {
        let testTailDataFrame: DataFrame;
        beforeAll(() => {
            let testDataFrameOptions: DataFrameOptions = {
                columns: dataFrameOptions.columns,
                data: dataFrameOptions.data.slice(1, 3)
            }
            testTailDataFrame = new DataFrame(testDataFrameOptions);
        });

        it('Should return bottom n rows', () => {
            const tail: DataFrame = dataFrame.tail(2);

            expect(tail.data).toEqual(testTailDataFrame.data);
            expect(tail.columns).toEqual(testTailDataFrame.columns);
        });

        it('Should return bottom 5 rows if n value is not given', () => {
            const tail: DataFrame = dataFrame.tail();

            expect(tail.data).toEqual(dataFrame.data);
            expect(tail.data).not.toEqual(testTailDataFrame.data);
            expect(tail.columns).toEqual(dataFrame.columns);
        });
    });

    it('Should return data type of columns as provided in options', () => {
        expect(dataFrame.getColumnTypes()).toEqual({ 'id': 'number', 'name': 'string', 'age': 'number' });
    });

    it('Should rename a column and return a new DataFrame with updated column name', () => {
        const renamedDataFrame = dataFrame.renameColumn('id', 'userId');
        expect(renamedDataFrame.columns).toEqual(['userId', 'name', 'age']);
        expect(renamedDataFrame.getColumnTypes()).toEqual({ 'userId': 'number', 'name': 'string', 'age': 'number' });
    })

    it('Should drop asked column and return an updated DataFrame', () => {
        const droppedDataFrame = dataFrame.dropColumn('id');

        expect(droppedDataFrame.columns).toEqual(['name', 'age']);
        expect(droppedDataFrame.getColumnTypes()).toEqual({ 'name': 'string', 'age': 'number' });
        expect(droppedDataFrame.rows).toEqual(dataFrame.rows);
    });

    it('Should return a new DataFrame with selected columns', () => {
        const selectedDataFrame = dataFrame.select(['name', 'age']);

        expect(selectedDataFrame.columns).toEqual(['name', 'age']);
        expect(selectedDataFrame.getColumnTypes()).toEqual({ 'name': 'string', 'age': 'number' });
        expect(selectedDataFrame.rows).toEqual(dataFrame.rows);
    });

    it('Should return row details of the dataFrame', () => {
        const dataFrameDetails = dataFrame.details();

        expect(typeof dataFrameDetails).toBe('string')
        expect(dataFrameDetails.includes(dataFrame.rows.toString())).toBeTruthy();
    });

    it('Should return the dataFrame converted to string', () => {
        const dataFrameString = dataFrame.toString();

        expect(typeof dataFrameString).toBe('string');
        expect(dataFrameString.includes(dataFrame.rows.toString())).toBeTruthy();
        expect(dataFrameString.includes(dataFrame.shape.toString())).toBeTruthy();
    });

    it('Should write dataFrame to a CSV file', () => {
        mockWriteFileSync.mockImplementation(() => { });
        dataFrame.toCSV('./test.csv');

        expect(mockWriteFileSync).toHaveBeenCalled();

    })

    it('Should write dataFrame to a JSON file', () => {
        mockWriteFile.mockImplementation(() => { });
        dataFrame.toJSON('./test.json');

        expect(mockWriteFile).toHaveBeenCalled();

    })

});