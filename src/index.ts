import { DataFrame } from "./implementations/dataFrame";

const df: DataFrame = new DataFrame({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

console.log(df.getColumnTypes());
console.log(df.toString() + '\n\n\n');

console.log(df.shape);

// declare a const variable and log df column types
const columnTypes = df.getColumnTypes();
console.log(columnTypes);

// const head = df.head(1);
// console.log(head.toString());



// const newDf: DataFrame = df.renameColumn('name', 'first_name');
// console.log(newDf.toString());


// const latestDf: DataFrame = newDf.dropColumn('gender');
// console.log(latestDf.toString());

// const columnNames = df.columns;
// console.log(columnNames);


