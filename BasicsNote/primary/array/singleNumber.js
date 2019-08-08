window.onload = function (ev) {
    
    
    // 测试用例
    let arr1 = [2, 2, 1];
    let arr2 = [4, 1, 2, 1, 2];
    
    function singleNumber1(arr) {
        for (let i = 0; i < arr.length; i++) {
            let flag = true;
            for (let j = 0; j < arr.length; j++) {
                if (j !== i && arr[i] === arr[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return arr[i];
        }
    }
    
    function singleNumber2(arr) {
        arr.sort();
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && arr[i] !== arr[i - 1] && arr[i] !== arr[i + 1]) {
                return arr[i];
            } else if (i === 0 && arr[i] !== arr[i + 1]) {
                return arr[0];
            }
        }
    }
    
    function singleNumber3(arr) {
        let setArr = new Set();
        for (let i = 0; i < arr.length; i++) {
            if (setArr.has(arr[i])) {
                setArr.delete(arr[i]);
            } else {
                setArr.add(arr[i]);
            }
        }
        let num;
        for (num of setArr) return num;
    }
    
    function singleNumber4(arr) {
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            num ^= arr[i];
        }
        return num;
    }
    
    
    const singleNumber = arr => arr.reduce((prev, cur) => prev ^ cur);
    
    console.log(singleNumber(arr1),arr1);
    console.log(singleNumber(arr2),arr2);
    
    
};