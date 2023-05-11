import DataFrame from "./combine";
import { DataFrameStructure } from "./implementations/dataFrameStructure";
import { DataManipulation } from "./implementations/dataManipulation";
import { FileIO } from "./implementations/fileIO";
import { GroupBy } from "./implementations/groupBy";
import { StatisticalOps } from "./implementations/statisticalOps";

const df: DataFrameStructure = new DataFrameStructure({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

// df.toJSON('/Users/theshdb/Desktop/Data Ops/test_json.json')
df.toCSV('/Users/theshdb/Desktop/Data Ops/test_csv.csv')

// console.log("" + df);
// console.log(df.to_String() + '\n\n\n');

// const test = new DataManipulation({
//     columns: ['name', 'age', 'gender', 'marks'],
//     data: [
//         ['Alice', 25, 'female', 10],
//         ['Bob', 30, 'male', 20],
//         ['Charlie', 35, 'male', 30],
//         ['Duck', 35, 'male', 30],
//         ['Flora', 25, 'female', 10],
//     ],
// })

// const groupBy: GroupBy = test.groupBy(test, ...['gender']);

const newDf: StatisticalOps = new StatisticalOps({
    columns: ['name', 'age', 'gender', 'marks'],
    data: [
        ['Alice', 25, 'female', 10],
        ['Bob', 30, 'male', 20],
        ['Charlie', 35, 'male', 30],
        ['Duck', 20, 'male', 30],
        ['Flora', 20, 'female', 10],
    ],
})
// console.log("" + newDf);


// const mean = newDf.mean(['marks', 'age']);
// console.log(mean, '----mean----');
// console.log(newDf.mode(['marks', 'age']), '----mode----');
// console.log(newDf.median(['marks', 'age']), '----median----');
// console.log(newDf.standardDeviation(['marks', 'age']), '----standardDeviation----');


const dfCsv = new FileIO();
// const dfN = dfCsv.fromJSON('/Users/theshdb/Desktop/Data Ops/test3.json');

// console.log(dfN.toString());


// const dataFrame = new DataFrame({
//     columns: ['name', 'age', 'gender'],
//     data: [
//         ['Alice', 25, 'female'],
//         ['Bob', 35, 'male'],
//         ['Charlie', 30, 'male'],
//     ],
// })

const dataFrame: DataFrame = DataFrame.fromJSON('/Users/theshdb/Desktop/Data Ops/test3.json');
// console.log(dataFrame.toString());
const grp = dataFrame.groupBy(dataFrame, ...['gender'])
// console.log(grp.sum('age'));
