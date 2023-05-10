import { DataFrame } from "./implementations/dataFrame";
import { DataManipulation } from "./implementations/dataManipulation";
import { GroupBy } from "./implementations/groupBy";

const df: DataFrame = new DataFrame({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

// for (const row of df) {
//     console.log(row.age);

// }



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
// const keys: string[] = Object.keys(groupBy.groupedData);
// for (const key of keys) {
//     console.log(key);

//     console.log(groupBy.groupedData[key.toString()], '--------');
// }
// console.log(groupBy.groupedData['female,25,10'], '--------');

// const groupBySum = groupBy.sum('marks');
// console.log(groupBySum);

// const count = groupBy.count();
// console.log(count);
// console.log(groupBy.mean('marks'));






