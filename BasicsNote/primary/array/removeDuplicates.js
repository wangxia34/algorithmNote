window.onload = function (ev) {
    // 测试用例
    let arr1 = [1, 1, 2];
    let arr2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 4];


    //    1
    function removeDuplicates1(arr) {
        let num = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === num) {
                arr.splice(i, 1);
                i--;
            } else {
                num = arr[i];
            }
        }
        return arr.length;
    }
    
    //   2
    function removeDuplicates(arr) {
        if (arr.length < 1) {
            return arr.length;
        }
        let i = 0;
        for (let j = 1; j < arr.length; j++) {
            if (arr[j] !== arr[i]) {
                i++;
                arr[i] = arr[j];
            }
        }
        arr.splice(i + 1);
        return i + 1;
    }
    
    
    console.log(removeDuplicates(arr1));
    console.log(arr1);
    
    console.log(removeDuplicates(arr2));
    console.log(arr2);





};