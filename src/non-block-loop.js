(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([false], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(true);
    } else {
        root.nonB = factory(false);
    }
}(this, function (isNodeJs) {
    'use strict';
    function arrayStepper(pos, end, array, stepLength, stepperCallback, resolve, reject) {
        if (pos > end) {
            return;
        }
        var middle = pos + stepLength;
        if (middle < end) {
            for (; pos <= middle; pos++) {
                if (array) {
                    stepperCallback(pos, array[pos]);
                } else {
                    stepperCallback(pos);
                }
            }
            setTimeout(arrayStepper, 0, pos, end, array, stepLength, stepperCallback, resolve, reject);
        } else {
            for (; pos < end; pos++) {
                if (array) {
                    stepperCallback(pos, array[pos]);
                } else {
                    stepperCallback(pos);
                }
            }
            resolve();
        }
    }

    function nfor(start, end, stepLength, stepperCallback) {
        return new Promise(function (resolve, reject) {
            arrayStepper(start, end, null, stepLength, stepperCallback, resolve, reject);
        });
    }

    function nforeach(array, stepLength, stepperCallback) {
        if (Object.prototype.toString.call(array)=='[object Array]') {
            return new Promise(function (resolve, reject) {
                arrayStepper(0, array.length, array, stepLength, stepperCallback, resolve, reject);
            });
        } else {
            throw new Error("Only support array");
        }
    }

    var nmap = nforeach; 

    function nsum(array, stepLength) {
        var sum = 0;
        return nforeach(array, stepLength, 
            function(pos, item){
                sum += item;
            }
        ).then(function(){
            return sum;
        });
    }

    function naverage(array, stepLength) {
        return nsum(array, stepLength).then(function(sum){
            return(sum / array.length);
        });
    }

    function nsoftmax(array, stepLength) {
        return nsum(array, stepLength).then(function(sum){
            var softmax_array = [];
            return nforeach(array, stepLength, 
                function(pos, item){
                    softmax_array.push(item / sum);
                }
            ).then(function(){
                return softmax_array;
            });
        });
    }

    /*
    *  Exports
    */
    return {
        nfor: nfor,
        nforeach: nforeach,
        nmap: nmap,
        nsum: nsum,
        naverage: naverage,
        nsoftmax: nsoftmax
    };
})
)