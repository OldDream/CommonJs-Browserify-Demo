class actionsFun {
    constructor() {
        this.text1 = 'test1'
        this.text2 = 'test2'
    }
    check() {
        console.log('start check function');
    }

}
const getGlobal = function () {
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
};

getGlobal().actionsfun = new actionsFun() // expose the instance to Global Object

let testObj = require('./modules/moduleA.js')
testObj.test()
