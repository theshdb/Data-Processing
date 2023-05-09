import { DataFrame } from "./abstractions/data_frame/dataFrame"
import { DataFrameOperations } from "./implementations/dataFrame"

console.log('abc')


const df = new DataFrameOperations({
    columns: ['name', 'age', 'gender'],
    data: [
        ['Alice', 25, 'female'],
        ['Bob', 30, 'male'],
        ['Charlie', 35, 'male'],
    ],
});

console.log([...df]);
const columnNames = df.columns;
console.log(columnNames);


