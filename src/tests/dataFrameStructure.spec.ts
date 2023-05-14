import { DataFrameOptions } from '../abstractions/interfaces';
import { DataFrame } from '../implementations/dataFrame';
import { DataFrameStructure } from '../implementations/dataFrameStructure';
import fs from 'fs'

describe('Test DataFrameStructure implementation class', () => {
    let dataFrameOptions: DataFrameOptions = {
        columns: ['id', 'name', 'age'],
        data: [
            [1, 'John', 30],
            [2, 'Jane', 25],
            [3, 'Joe', 40]
        ]
    };

    it('should create a new instance', () => {
        const structure = new DataFrameStructure(dataFrameOptions);
        expect(structure).toBeDefined();
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
            const structure = new DataFrameStructure(dataFrameOptions);
            const head: DataFrame = structure.head(2);

            expect(head.data).toEqual(testHeadDataFrame.data);
            expect(head.columns).toEqual(testHeadDataFrame.columns);
        });

        it('Should return top 5 rows if n value is not given', () => {
            const structure = new DataFrameStructure(dataFrameOptions);
            const head: DataFrame = structure.head();

            expect(head.data).toEqual(structure.data);
            expect(head.data).not.toEqual(testHeadDataFrame.data);
            expect(head.columns).toEqual(structure.columns);
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
            const structure = new DataFrameStructure(dataFrameOptions);
            const tail: DataFrame = structure.tail(2);

            expect(tail.data).toEqual(testTailDataFrame.data);
            expect(tail.columns).toEqual(testTailDataFrame.columns);
        });

        it('Should return bottom 5 rows if n value is not given', () => {
            const structure = new DataFrameStructure(dataFrameOptions);
            const tail: DataFrame = structure.tail();

            expect(tail.data).toEqual(structure.data);
            expect(tail.data).not.toEqual(testTailDataFrame.data);
            expect(tail.columns).toEqual(structure.columns);
        });
    });

    it('Should return data type of columns as provided in options', () => {
        const structure = new DataFrameStructure(dataFrameOptions);
        expect(structure.getColumnTypes()).toEqual({ 'id': 'number', 'name': 'string', 'age': 'number' });
    });

    it('Should rename a column and return a new DataFrame with updated column name', () => {
        const structure = new DataFrameStructure(dataFrameOptions);
        const renamedDataFrame = structure.renameColumn('id', 'userId');
        expect(renamedDataFrame.columns).toEqual(['userId', 'name', 'age']);
        expect(renamedDataFrame.getColumnTypes()).toEqual({ 'userId': 'number', 'name': 'string', 'age': 'number' });
    })

    it('Should drop asked column and return an updated DataFrame', () => {
        const dataFrame = new DataFrameStructure(dataFrameOptions);
        const droppedDataFrame = dataFrame.dropColumn('id');
        expect(droppedDataFrame.columns).toEqual(['name', 'age']);
        expect(droppedDataFrame.getColumnTypes()).toEqual({ 'name': 'string', 'age': 'number' });
        expect(droppedDataFrame.rows).toEqual(dataFrame.rows);
    });

    it('Should return a new DataFrame with selected columns', () => {
        const dataFrame = new DataFrameStructure(dataFrameOptions);
        const selectedDataFrame = dataFrame.select(['name', 'age']);

        expect(selectedDataFrame.columns).toEqual(['name', 'age']);
        expect(selectedDataFrame.getColumnTypes()).toEqual({ 'name': 'string', 'age': 'number' });
        expect(selectedDataFrame.rows).toEqual(dataFrame.rows);
    });

    it('Should return row details of the dataFrame', () => {
        const dataFrame = new DataFrameStructure(dataFrameOptions);
        const dataFrameDetails = dataFrame.details();
        expect(typeof dataFrameDetails).toBe('string')
        expect(dataFrameDetails.includes(dataFrame.rows.toString())).toBeTruthy();
    });

    it('Should return the dataFrame converted to string', () => {
        const dataFrame = new DataFrameStructure(dataFrameOptions);
        const dataFrameString = dataFrame.toString();

        expect(typeof dataFrameString).toBe('string');
        expect(dataFrameString.includes(dataFrame.rows.toString())).toBeTruthy();
        expect(dataFrameString.includes(dataFrame.shape.toString())).toBeTruthy();
    });

    it('Should write dataFrame to a CSV file', () => {
        const dataFrame = new DataFrameStructure(dataFrameOptions);
        const filePath = './test.csv';
        dataFrame.toCSV(filePath);

        setTimeout(() => { }, 1000)

        expect(fs.existsSync(filePath)).toBeTruthy();
        fs.unlink(filePath, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });

});