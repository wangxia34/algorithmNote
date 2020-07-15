const nextTick = (function () {
    let callbacks = [];
    let pending = false;
    let timerFunc;
    function nextTickHandler () {
        pending = false;
        let copies = callbacks.slice(0);
        callbacks = [];
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }
    /* istanbul ignore if */
    if (typeof MutationObserver !== 'undefined') { // 首选 MutationObserver
        let counter = 1;
        let observer = new MutationObserver(nextTickHandler); // 声明 MO 和回调函数
        let textNode = document.createTextNode(counter);
        observer.observe(textNode, { // 监听 textNode 这个文本节点
            characterData: true // 一旦文本改变则触发回调函数 nextTickHandler
        });
        timerFunc = function () {
            counter = (counter + 1) % 2; // 每次执行 timeFunc 都会让文本在 1 和 0 间切换
            textNode.data = counter
        }
    } else {
        timerFunc = setTimeout // 如果不支持 MutationObserver, 退选 setTimeout
    }
    return function (cb, ctx) {
        let func = ctx
            ? function () { cb.call(ctx) }
            : cb;
        callbacks.push(func);
        if (pending) return;
        pending = true;
        timerFunc(nextTickHandler, 0)
    }
})();

class Promise1 {
    constructor(executor) {
        if (typeof executor !== "function") {
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        
        this.init();
        this.initBind();
        
        try {
            executor(this.resolve, this.reject)
        } catch(e) {
            this.reject(e)
        }
        
    }
    
    init() {
        this.state = Promise1.PENDING; //状态
        this.value = null; // 终值
        this.reason = null; // 据因
        this.onFulfilledCallbacks = []; // 成功回调
        this.onRejectedCallbacks = []; // 失败回调
    }
    
    initBind() {
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
    }
    
    reject(reason) {
        if (this.state === Promise1.PENDING) {
            this.state = Promise1.REJECT;
            this.reason = reason;
    
            this.onRejectedCallbacks.forEach((fn) => {fn(this.reason)})
        }
    }
    
    resolve(value) {
        if (this.state === Promise1.PENDING) {
            this.state = Promise1.RESOLVE;
            this.value = value;
            // 成功后进行成功数组的执行
            this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
        }
    }
    
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function'){
            onFulfilled = function(value) {
                return value
            }
        }
        if (typeof onRejected !== 'function'){
            onRejected = function(reason){
                throw reason
            }
        }
        
        /*
        if(this.state === Promise1.RESOLVE){
            setTimeout(() => {
                onFulfilled(this.value)
            })
        }
        if(this.state === Promise1.REJECT){
            setTimeout(() => {
                onRejected(this.reason)
            })
        }
        // 如果是等待状态追加一个状态判断
        if (this.state === Promise1.PENDING) {
            this.onFulfilledCallbacks.push((value) => {
                setTimeout(() => {
                    onFulfilled(value)
                })
            });
            this.onRejectedCallbacks.push((reason) => {
                setTimeout(() => {
                    onRejected(reason)
                })
            })
        }
         */
        
        let promise2 = new Promise1((resolve, reject) => {
            if(this.state === Promise1.RESOLVE){
    
                nextTick(() => {
                    try {
                        const x = onFulfilled(this.value);
                        Promise1.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, this);
                
                // setTimeout(() => {
                //     try {
                //         const x = onFulfilled(this.value);
                //         Promise1.resolvePromise(promise2, x, resolve, reject)
                //     } catch (e) {
                //         reject(e)
                //     }
                //
                // })
            }
            if(this.state === Promise1.REJECT){
                nextTick(() => {
                    try {
                        const x = onRejected(this.reason);
                        Promise1.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, this);
                // setTimeout(() => {
                //     try {
                //         const x = onRejected(this.reason);
                //         Promise1.resolvePromise(promise2, x, resolve, reject)
                //     } catch (e) {
                //         reject(e)
                //     }
                //
                // })
            }
            // 如果是等待状态追加一个状态判断
            if (this.state === Promise1.PENDING) {
                this.onFulfilledCallbacks.push((value) => {
                    nextTick(() => {
                        try {
                            const x = onFulfilled(value);
                            Promise1.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, this);
                    // setTimeout(() => {
                    //     try {
                    //         const x = onFulfilled(value);
                    //         Promise1.resolvePromise(promise2, x, resolve, reject)
                    //     } catch (e) {
                    //         reject(e)
                    //     }
                    // })
                });
                this.onRejectedCallbacks.push((reason) => {
                    nextTick(() => {
                        try {
                            const x = onRejected(reason);
                            Promise1.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, this);
                    // setTimeout(() => {
                    //     try {
                    //         const x = onRejected(reason);
                    //         Promise1.resolvePromise(promise2, x, resolve, reject)
                    //     } catch (e) {
                    //         reject(e)
                    //     }
                    // })
                })
            }
        });
        
        return promise2
    }
    
    all(promises) {
        return new Promise1((resolve, reject) => {
            // 存放返回结果
            let results = [];
            // 存放返回结果的个数，因为promise为异步，无法用数组长度确定
            let i = 0;
            // 处理返回结果顺序，并记录返回结果数量
            function processData(index, data) {
                results[index] = data;
                if (++i === promises.length) {
                    resolve(results);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                let p = promises[i];
                p.then((data) => { // 成功后把结果和当前索引 关联起来
                    processData(i, data);
                }, reject);
            }
        })
    }
    
    race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let p = promises[i];
                p.then(resolve, reject);
            }
        })
    }
}

Promise1.REJECT = "rejected";
Promise1.RESOLVE = "fulfilled";
Promise1.PENDING = "pending";
// 返回值不是基本值的处理
Promise1.resolvePromise = function (promise2, x, resolve, reject) {
    // x与promise相等
    if (promise2 === x) {
        reject(new TypeError("Chaining cycle detected for promise"))
    }
    let called = false;
    if (x instanceof Promise1) {
        // 如果返回值是Promise1  递归解析 直到返回为普通值为止
        x.then(value => {
            Promise1.resolvePromise(promise2, value, resolve, reject)
        }, reason => {
            reject(reason)
        })
    } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // 如果返回值是对象或者函数
        try {
            const then = x.then;
            if (typeof then === "function") {
                // then为一个方法 暂且的认为是promise
                // 让返回的这个x 也就是返回的promise执行用他的状态让promise2成功或者失败
                // 因为这里还涉及到别人promise 有的人写的promise 会成功还会调用失败
                then.call(x, value => {
                    if (called) return;
                    called = true;
                    // 如果返回值是Promise1  递归解析 直到返回为普通值为止
                    Promise1.resolvePromise(promise2, value, resolve, reject)
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason)
                })
            } else {
                if (called) return;
                called = true;
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
};













