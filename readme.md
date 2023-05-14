[![npm version](https://img.shields.io/npm/v/theshdb-data-ops.svg)](https://www.npmjs.com/package/theshdb-data-ops)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# data-ops
Library similar to pandas for JavaScript

data-ops is an open source (experimental) library mimicking the
Python [pandas](http://pandas.pydata.org/) library. The main data objects in data-ops is the
[`DataFrame`](#dataframe)

## Documentation

See [the docs](https://theshdb.github.io/data-ops/)  

## Installation and use
```
$ npm i theshdb-data-ops
```

Importing
[`DataFrame`](https://theshdb.github.io/data-ops/classes/DataFrame.html)
```js
import { DataFrame } from 'theshdb-data-ops';
```

Create a new `DataFrame`
```js
const df = new DataFrame({
        columns: ['Name', 'Age', 'Gender'],
        data: [
          ['Alice', 30, 'Female'],
          ['Bob', 25, 'Male'],
          ['Charlie', 40, 'Male'],
        ],
    });

df.toString();

//Returns:

// DataFrame
// Shape: (3,3)
//         Name                    Age                     Gender    

// 1       Alice                   30                      Female    
// 2       Bob                     25                      Male      
// 3       Charlie                 40                      Male  
```

Create a `DataFrame` from a CSV file

``` js
const df = DataFrame.fromCSV('data.csv');
```

### Testing and build
```
$ npm run test
$ npm run build
```
Testing uses [Jest](https://facebook.github.io/jest/).