var nbl = require('../src/non-block-loop');
var chai = require('chai');

describe('nfor', function(){
    it('if stepLength > array length', function(){
        var array = [0,1,2,3];
        var res = [];
        return nbl.nfor(0, 4, 1000, function(pos){
            res.push(pos);
        }).then(function(){
            chai.assert(array.length === res.length, "haven't loop all element");
            for (let i = 0; i < array.length; i++) {
                chai.assert(array[i] === res[i]);
            }
        });
    });
    it('if stepLength < array length', function(){
        var array = [0,1,2,3];
        var res = [];
        return nbl.nfor(0, 4, 1, function(pos){
            //console.log(pos);
            res.push(pos);
        }).then(function(){
            chai.assert(array.length === res.length, "haven't loop all element");
            for (let i = 0; i < array.length; i++) {
                chai.assert(array[i] === res[i]);
            }
        });
    });
    it('if stepLength = array length', function(){
        var array = [0,1,2,3];
        var res = [];
        return nbl.nfor(0, 4, 4, function(pos){
            res.push(pos);
        }).then(function(){
            chai.assert(array.length === res.length, "haven't loop all element");
            for (let i = 0; i < array.length; i++) {
                chai.assert(array[i] === res[i]);
            }
        });
    });
});

describe('nforeach', function(){
    it('if go over each element in order', function() {
        var array = [12312,4124512,1232512,11123456,979678,235,12456987];
        var i = 0;
        return nbl.nforeach(array, 1, function(pos, item) {
            chai.assert(pos == i);
            chai.assert(array[pos] == item);
            i++;
        });
    });
});

describe('nsum', function(){
    it('if nsum == sum of an array', function(){
        var array = [0,1,2,3];
        var sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return nbl.nsum(array,1).then(function(value){
            chai.assert(sum === value);
        });
    });
});

describe('naverage', function(){
    it('if naverage == average of an array', function(){
        var array = [0,1,2,3];
        var sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        var average = sum / array.length;
        return nbl.naverage(array,1).then(function(value){
            chai.assert(average === value);
        });
    });
});

describe('nsoftmax', function(){
    it('if nsoftmax == softmax of an array', function(){
        var array = [12312,4124512,1232512,11123456,979678,235,12456987];
        var sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i]/sum;
        }
        return nbl.nsoftmax(array,1).then(function(value){
            for (let i = 0; i < array.length; i++) {
                chai.assert(Math.round(value[i]) === Math.round(array[i]), "expected:"+array[i]+"got:"+value[i]);
            }
        });
    });
});