## An example

```
    // ES5 code
    function getCar(make, model, value) {
        car = {
            make: make,
            model: model,
            value: value,
            depreciate: function() {
                this.value -= 2500;
            }
            setValue(value) {
                if (value < 0)
                    throw new Error('invalid value');
                this.value = value;
            }
        };
        car['make' + make] = true;
        return car;
    }
```

```
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

### Our sample in ES6

    // ES6 code
    const getCar = (make, model, value) => {
        return {
            make,
            model,
            _value: value,
            car['make' + make]: true,
            depreciate() {
                this.value -= 2500;
            }
            set value(value) {
                if (value < 0)
                    throw new Error('invalid value');
                this._value = value;
            }
            get value() {
                return this._value;
            },
        };
    }
