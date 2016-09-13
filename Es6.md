# ES6

## TC39

The Ecma TC39 committee is responsible for evolving the ECMAScript programming language and authoring the specification. The committee operates by consensus and has discretion to alter the specification as it sees fit. However, the general process for making changes to the specification is as follows.

The TC39 Process

- Stage 0: Initial input
- Stage 1: Proposal (spec, polyfill, demo)
- Stage 2: Draft (ready for testing)
- Stage 3: Candidate (almost there, last bits)
- Stage 4: Finished (ready)

Info

- https://github.com/tc39
- https://github.com/tc39/proposals
- https://github.com/tc39/proposals/blob/master/finished-proposals.md

TypeScript
- https://github.com/Microsoft/TypeScript/wiki/Roadmap

## How to use

*Native Support*

https://kangax.github.io/compat-table/es6/

*Compilers/polyfills*
- Babel
- TypeScript

#### Node

    // .babelrc
    {
        "presets": ["es2017"],
        "plugins": [
            "transform-object-rest-spread",
            ...
        ]
    }

    // index.js (this file is ES5 with commonJS)
    require('babel-core/register');
    require('./server');

    // server.js (fully ES6/ES7)
    import app from './express';

    // startup
    node index.js

For the production build, make sure you transpile to ES5

    babel -d ./build ./server -s --ignore *.test.js"

> This is also possible with TypeScript 2.1+

#### Browser

Babel

    // .babelrc
    {
        "presets": ["es2017"],
        "plugins": [
            "transform-object-rest-spread",
            ...
        ]
    }

    // webpack.config.js
    module.exports = {
        entry: './main.js',
        output: { path: __dirname, filename: 'bundle.js' },
        module: {
            loaders: [
                {
                    test: /.js?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                }
            ]
        },
    };

> You can also use .babelrc in stead of 'query'

TypeScript

    // tsconfig.json
    {
        "compilerOptions": {
            "declaration": false,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": ["es6", "dom"],
            "mapRoot": "./",
            "module": "es6",
            "moduleResolution": "node",
            "outDir": "../dist/out-tsc",
            "sourceMap": true,
            "target": "es5",
            "typeRoots": [
                "../node_modules/@types"
            ]
        }
    }

    // webpack.config.js
    module.exports = {
        entry: './main.js',
        output: { path: __dirname, filename: 'bundle.js' },
        module: {
            loaders: [
                {
                    test: /.ts?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                }
            ]
        },
    };

Polyfill (Map, Set, Object.xxx, ...)

    import 'core-js';
    // or babel/polyfill
    // or es6-shim

For unit testing (phantomjs limitations)

    require('phantomjs-polyfill')
    require('phantomjs-polyfill-includes')

## Enhanced Object Literals

```
    function getCar(make, model, value) {
        return {
            // with property value shorthand syntax, you can omit the property
            // value if key matches variable name
            make,  // same as make: make
            model, // same as model: model
            value, // same as value: value

            // computed values now work with object literals
            ['make' + make]: true,

            // Method definition shorthand syntax omits `function` keyword & colon
            depreciate() {
                this.value -= 2500;
            }
        };
    }

    let car = getCar('BMW', '520', 40000);

    // output: {
    //     make: 'BMW',
    //     model:'520',
    //     value: 40000,
    //     depreciate: function()
    // }
    console.log(car);

    car.depreciate();

    // output: 37500
    console.log(car.value);
```

### Property value shorthand

    // ES3/ES5
    function getCar(make, model, value) {
        return {
            make: make,
            model: model,
            value: value
        };
    }

vs

    // ES6
    // With property value shorthand syntax, you can omit the property
    // value if key matches variable name.
    function getCar(make, model, value) {
        return {
            make,
            model,
            value
        };
    }

### Computed property keys

    // ES3/ES5
    function getCar(make, model, value) {
        var car = {};
        car['make' + make] = true;
        return car;
    }

vs

    // es6
    // Computed values now work with object literals
    function getCar(make, model, value) {
        return {
            ['make' + make]: true
        };
    }

### Method definition shorthand

    // ES5
    function getCar(make, model, value) {
        return {
            depreciate: function() {
                this.value -= 2500;
            }
        };
    }

vs

    // ES6
    // Method definition shorthand syntax omits `function` keyword & colon
    function getCar(make, model, value) {
        return {
            depreciate() {
                this.value -= 2500;
            }
        };
    }

### Property accessors (getters and setters) - ES5

    function getCar(make, model, value) {
        return {
            _value: value,
            get value() {
                return this._value;
            },
            set value(value) {
                if (value < 0)
                    throw new Error('invalid value');
                this._value = value;
            }
    }

    let car = getCar('Volvo', 'V70', 30000);
    console.log(car.value);     // OUTPUT: 30000
    car.value = -1;             <- ERROR

### New methods in Object

#### Object.assign

    const obj = { foo: 123 };
    Object.assign(obj, { bar: true });
    console.log(JSON.stringify(obj));     // OUTPUT: {"foo":123,"bar":true}

    // Adding properties to this
    class Point {
       constructor(x, y) {
            Object.assign(this, {x, y});
        }
    }

    // Providing default values for object properties
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };
    function processContent(options) {
        options = Object.assign({}, DEFAULTS, options); // (A)
        ···
    }

    // cloning objects
    function clone(orig) {
        return Object.assign({}, orig);
    }

#### Object.keys(obj)

Retrieves all string keys of all enumerable own (non-inherited) properties.

    const x = {
        id: 1234,
        name: 'abc',
    }
    Object.keys(x) === ['id', 'name']

Alternative

    for (const key in obj) {
        ...
    }

#### Object.entries/Object.values

> ES - Stage 4 - Finished (ES7) - TypeScript 2.0

    var obj = { foo: "bar", baz: 42 };
    console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

    var obj = { foo: "bar", baz: 42 };
    console.log(Object.values(obj)); // ['bar', 42]

    // .babelrc
    {
        "presets": ["es2017"],
        "plugins": ["transform-runtime"]
    }

## Promises

Replaces Q, Bluebird, ... One rules them all

    function timeout(duration = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        })
    }

    var p = timeout(1000)
        .then(() => {
            return timeout(2000);
        })
        .then(() => {
            throw new Error("hmm");
        })
        .catch(err => {
            return Promise.all([timeout(100), timeout(200)]);
        })

## Symbols

Properties of an object can be either a string (as in ES5) or symbol (new in ES6)

    var key = Symbol("key");
    const myObject = {
        [key] = 'abc'
    }

## Class syntax

### private variables

    var key = Symbol("key");

    class MyClass {
        constructor(privateData) {
            this[key] = privateData;
        }
    }

    var x = new MyClass('hello')
    JSON.stringify(x) == '{}'
    x['key'] == undefined

## Arrow functions

### Simpler syntax

    var createGreeting = function(message, name) {
        return message + name;
    }

    // version 1
    var arrowGreeting = (message, name) => {
        return message + name;
    }

    // version 2
    var arrowGreeting = (message, name) => message + name;

### this reference

```
var deliveryBoy = {
    name: 'peter',
    handleMessage: function (message, handler) {
        handler(message);
    },
    receive: function() {
        var that = this;

        this.handleMessage('hello', function(message) {
            console.log(message + that.name);
        })
    }
}

deliveryBoy.receive();
```

```
// improved
var deliveryBoy = {
    name: 'peter',
    handleMessage: function (message, handler) {
        handler(message);
    },
    receive: function() {
        this.handleMessage('hello', (message) => {
            console.log(message + this.name);
        })
    }
}
```

## The let keyword

https://egghead.io/lessons/the-let-keyword

```
// block scoping
var message = 'hi';
{
    var message = 'bye';
}
console.log(message)

// function scoping
var message = 'hi';
function greet() {
    var message = 'bye';
}
greet();
console.log(message)

// block scoping with let
let message = 'hi';
{
    let message = 'bye';
}
console.log(message)
```

```
var fs = [];
for (var i = 0; i < 10; i++) {
    fs.push(function() {
        console.log(i);
    })
}

fs.forEach(function(f) {
    f();
})
```

```
var fs = [];
for (let i = 0; i < 10; i++) {
    fs.push(function() {
        console.log(i);
    })
}

fs.forEach(function(f) {
    f();
})
```

## Generators

### basics

    function *foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    }

    // get an iterator
    var it = foo();

    // get the result
    it.foo();     // 1
    it.foo();     // 2
    it.foo();     // 3
    ...

    // loop over
    for(const i of it) {
        console.log(i)
    }

### underscore example

    var activeUsers = _.filter(users, function(user) { return user.isActive });
    var ages        = _.map(activeUsers, function(user) { return user.age });

    function *map(items, transform) {
      for (item of items)
        yield transform(item);
    }
    function *filter(items, predicate) {
      for (item of items)
        if (predicate(item))
          yield item;
    }

    for (const user of activeusers) {
        console.log(user);
    }

## Object spread

> ES - Stage 2 - Draft
> It is supported by TypeScript from 2.0+

    const myObject = { id: 12345, name: 'abc' }

    const newObject = {
        ...myObject
        id: 54321
    }

> Great for immutable objects!
> Its by default enabled by ReactNative

#### Setup

    // babel config
    {
        "plugins": [ "transform-object-rest-spread" ]
    }

## Public Class Fields

> ES - Stage 2 - Draft (https://tc39.github.io/proposal-class-public-fields/)
> It is supported by TypeScript from 1.7+

    class MyClass {
        myProp = 42;
        static myStaticProp = 21;
        constructor() {
            console.log(this.myProp); // Prints '42'
            console.log(MyClass.myStaticProp); // Prints '21'
        }
    }

#### Setup

    // babel config
    {
        "plugins": [ "transform-class-properties" ]
    }

## Function Trailing Comma

Trailing commas are ignored in object literals:

    let obj = {
        first: 'Jane',
        last: 'Doe',
    };

And they are also ignored in Array literals:

    let arr = [
        'red',
        'green',
        'blue',
    ];

Why not in function parameters

> ES - Stage 4 - Candidate

    function copyThisData(
        param1,
        param2,
    ) { /* ... */ }

#### Setup

    // babel config
    {
        "plugins": [ "syntax-trailing-function-commas" ]
    }

## Async / Await

> ES - Stage 3 - Candidate
> It is supported by TypeScript 1.7+

    // an async function
    const fetchSomething = () => new Promise((resolve) => {
        setTimeout(() => resolve('future value'), 500);
    });

    // ES5
    const promiseFunc = () => new Promise((resolve) => {
        fetchSomething().then(result => {
            resolve(result + ' 2');
        });
    });

    // ES7
    async function asyncFunction() {
        const result = await fetchSomething(); // returns promise
        return result + ' 2';
    }

#### Setup

    // babel config
    {
        "plugins": [ "syntax-async-functions", "transform-regenerator" ]
    }

    // polyfill for regeneratorRuntime
    import 'babel-polyfill';

## Does ES6 Mean The End Of Underscore / Lodash?

For example, some underscore -> es5/es6 array methods:

    // Underscore                           ES5/6
    // ----------------------               ---------------------
    _.each(array, iteratee)                 array.forEach(iteratee)
    _.map(array, iteratee)                  array.map(iteratee)
    _.reduce(array, iteratee, memo)         array.reduce(iteratee, memo)
    _.every(array, predicate)               array.every(predicate)
    _.some(array, predicate)                array.some(predicate)
    _.find(array, predicate)                array.find(predicate)
    _.includes(array, element)              array.includes(element)
    _.toArray(arguments)                    [...arguments]
    _.compact(array)                        array.filter(x => !!x)
    _.indexOf(array, value)                 array.indexOf(value)
    _.keys(object)                          Object.keys(object)
    _.assign({}, source, {a:false})         Object.assign({},source,{a:false})
    _.extendOwn({}, object)                 { ...object }
    _.isArray(object)                       Array.isArray(object)
    _.noop                                  () => {}
    _.template("hello <%= name %>")         `hello ${name}`
    _.deepClone(source)                     X


https://derickbailey.com/2016/09/12/does-es6-mean-the-end-of-underscore-lodash/?tl_inbound=1&tl_target_all=1&tl_period_type=3
https://www.reindex.io/blog/you-might-not-need-underscore/
