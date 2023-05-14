import fs from 'fs';
import { DataFrame } from '../index';

jest.mock('fs', () => ({
    readFileSync: jest.fn(),
}));

describe('Testing dataFrame class', () => {
    let dataFrame: DataFrame;

    beforeEach(() => {
        (fs.readFileSync as jest.Mock).mockClear();
    });

    afterAll(() => {
        (fs.readFileSync as jest.Mock).mockRestore();
    })

    it('should read a dataFrame object after reading provided csv file', () => {
        const fileContents = 'name,age,gender\nJohn,25,male\nJane,30,female';
        (fs.readFileSync as jest.Mock).mockReturnValueOnce(fileContents);

        dataFrame = DataFrame.fromCSV('test.csv');
        expect(dataFrame).toBeDefined();
        expect(dataFrame instanceof DataFrame).toBeTruthy();
        expect(dataFrame.columns).toEqual(['name', 'age', 'gender']);
    });

    it('should return a dataFrame object after reading provided json file', () => {
        const fileContents = '[{"name":"John","age":25,"gender":"male"},{"name":"Jane","age":30,"gender":"female"}]';
        (fs.readFileSync as jest.Mock).mockReturnValueOnce(fileContents);

        dataFrame = DataFrame.fromJSON('test.json');
        expect(dataFrame).toBeDefined();
        expect(dataFrame instanceof DataFrame).toBeTruthy();
        expect(dataFrame.columns).toEqual(['name', 'age', 'gender']);
    });

});