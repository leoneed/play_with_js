if (!Function.prototype.default) {

    Function.prototype.default = function() {

        if (typeof this !== 'function') {
            throw new TypeError('Is not a function');
        }

        var functionWithDefaults = this;
        var defaultsLength = arguments.length;
        var defaults = arguments;

        return function() {
            var currentArgs = Array.prototype.slice.apply(arguments);

            for (var i = 0; i < defaultsLength; ++i) {
                if (!arguments.hasOwnProperty(i)) {
                    currentArgs[i] = defaults[i];
                } 
            }

            return functionWithDefaults.apply(this, currentArgs);
        }
    }

}

var Test = function (a, b, c) {
    console.log(a +', '+ b +', '+ c);
}.default(1, null, 'Hello');

Test();
Test('Nice');
Test('Nice', undefined);
Test('Nice', false, null);