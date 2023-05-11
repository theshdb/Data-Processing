import { DataFrame } from "./implementations/dataFrame";
import { DataManipulation } from "./implementations/dataManipulation";
import { GroupBy } from "./implementations/groupBy";
import { StatisticalOps } from "./implementations/statisticalOps";

const df: DataFrame = new DataFrame({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

// console.log(df.getColumnTypes());
// console.log(df.toString() + '\n\n\n');

const test = new DataManipulation({
    columns: ['name', 'age', 'gender', 'marks'],
    data: [
        ['Alice', 25, 'female', 10],
        ['Bob', 30, 'male', 20],
        ['Charlie', 35, 'male', 30],
        ['Duck', 35, 'male', 30],
        ['Flora', 25, 'female', 10],
    ],
})

const groupBy: GroupBy = test.groupBy(test, ...['gender']);

const dfNew: DataFrame = new DataFrame({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

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

// const mean = newDf.mean(['marks', 'age']);
// console.log(mean, '----mean----');
// console.log(newDf.mode(['marks', 'age']), '----mode----');
// console.log(newDf.median(['marks', 'age']), '----median----');
// console.log(newDf.standardDeviation(['marks', 'age']), '----standardDeviation----');



