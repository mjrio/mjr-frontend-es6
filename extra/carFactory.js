/*
    exercise: update this code to ES6
*/
var carFactory = (function() {

    function createCar(make, model, value) {
        var car = {
            make: make,
            model: model,
            value: value,
            depreciate: function() {
                this.value -= 2500;
            },
            setValue: function(value) {
                if (value < 0)
                    throw new Error('invalid value');
                this.value = value;
            },
            delayLogName: function(timeout) {
                timeout = timeout || 100;
                var that = this;
                setTimeout(function() {
                    console.log('name', that.make);
                }, timeout);
            },
            sayWroom: function() {
                return 'Wroom ' + this.make + ' ' + this.model;
            }
        };
        car['make' + make] = true;
        return car;
    }

    return {
        getCar: getCar
    }
})();

car = carfactory.createCar('bmw', '5', 40000);

