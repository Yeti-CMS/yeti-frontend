/**
 * Core Object (JIT Module Factory)
 */
var Core = (function Core () {

    var constructor = this;

    /**
     * Prevent direct execution
     */
    if (this instanceof Core)
        throw new TypeError("Failed to construct: Please use the 'new' operator, this object constructor cannot be called as a function.");

    /**
     * datastore getter
     */
    function get (key) {
        return this.data[key];
    }


    /**
     * datastore setter
     */
    function set (key, value) {
        return this.data[key] = value;
    }


    /**
     * Executes an array of functions, Sequentially
     */
    function executeFunctionArray (functionArray, args) {
        if (typeof(functionArray) !== "object" || !functionArray.length) return false;

        for (var i = 0; i < functionArray.length; i++) {
            args = functionArray[i](args);
        }

        return args;
    }


    /**
     * Registers a new global on the current object
     */
    function registerGlobal (key, value) {

        if (typeof(this[key]) === "undefined") {

            if (typeof(value) === "function") {

                this[key] = function () {
                    /**
                     * Prepare Arguments
                     *
                     * TODO: (Source: MDN)
                     * You should not slice on arguments because it prevents optimizations in JavaScript
                     * engines (V8 for example). Instead, try constructing a new array by iterating
                     * through the arguments object.
                     */
                    // var args = Array.prototype.slice.call(arguments);
                    var args = arguments;
                    if (args.length === 0) args = null;

                    /**
                     * Execute the intended function
                     */
                    var result = value.apply(this, args);

                    return result;
                };

            } else {

                // If the global is being set to any other type of object or value, just do it.
                this[key] = value;

            }

        } else {
            console.log("WARNING: A module attempted to write to the `" + key + "` namespace, but it is already being used.");
        }
    }


    /**
     * Return public objects & methods
     */
    var obj = {
        data: {},
        executeFunctionArray: executeFunctionArray,
        registerGlobal: registerGlobal,
        __proto__: constructor,
        get: get,
        set: set
    };
    
    if (_) obj = $.extend({}, _, obj);

    return function () {
        return obj;
    };
})();
