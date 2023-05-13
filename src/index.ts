export * from './implementations/dataFrame';

import DataFrame from './implementations/dataFrame';

const df = new DataFrame({
    columns: ['name', 'age'],
    data: [['ALEX', 12], ['BOB', 14]]
})

console.log(df.toString());
