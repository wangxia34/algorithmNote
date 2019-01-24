window.onload = function (ev) {
    
    // 测试用例
    let arr1 = [1, 2, 3, 1];
    let arr2 = [1, 2, 3, 4];
    let arr3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
    
    function containsDuplicate1(arr) {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (obj[arr[i]] === undefined) {
                obj[arr[i]] = 1;
            } else {
                return true;
            }
        }
        return false;
    }
    
    function containsDuplicate2(arr) {
        arr.sort();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i + 1]) {
                return true;
            }
        }
        return false;
    }
    
    function containsDuplicate(arr) {
        const arr1 = new Set(arr);
        return arr1.size !== arr.length;
    }
    
    console.log(arr1, containsDuplicate(arr1));
    console.log(arr2, containsDuplicate(arr2));
    console.log(arr3, containsDuplicate(arr3));
    
    
};