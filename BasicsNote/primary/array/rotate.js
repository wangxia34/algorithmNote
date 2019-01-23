window.onload = function (ev) {
    
    let arr1 = [1, 2, 3, 4, 5, 6, 7];
    let arr2 = [-1, -100, 3, 99];
    let arr3 = [1, 2];
    
    function rotate1(arr, k) {
        let reK = k;
        if (k <= 0 || k === arr.length) {
            return;
        } else if (k > arr.length) {
            reK = k % arr.length;
        }
        
        let num = arr.slice(arr.length - reK);
        let n = reK;
        for (let i = 0; i < arr.length; i++) {
            [arr[i], num[reK - n]] = [num[reK - n], arr[i]];
            n > 1 ? n-- : n = reK;
        }
    }
    
    
    
    function rotate2(arr, k) {
        let reK = k;
        if (k <= 0 || k === arr.length) {
            return;
        } else if (k > arr.length) {
            reK = k % arr.length;
        }
        let num = arr.splice(arr.length - reK);
        arr.unshift(...num);
    }
    
    function rotate3(arr, k) {
        let reK = k;
        if (k <= 0 || k === arr.length) {
            return;
        } else if (k > arr.length) {
            reK = k % arr.length;
        }
        let num = arr.slice(arr.length - reK);
        for (let i = arr.length - 1; i >= 0; i--) {
            arr[i] = i < reK ? num[i] : arr[i - reK];
        }
    }
    
    function rotate(arr, shift){
        function reverse(arr, begin, end){
            while(begin < end){
                [arr[begin], arr[end]] = [arr[end], arr[begin]];
                begin++;
                end--;
            }
        }
        let length = arr.length;
        shift = shift % length;
        reverse(arr, length - shift, length - 1);
        reverse(arr, 0, length - shift - 1);
        reverse(arr, 0, length - 1);
    }
    
    
    rotate(arr1, 3);
    console.log(arr1);
    
    rotate(arr2, 2);
    console.log(arr2);
    
    rotate(arr3, 3);
    console.log(arr3);
    
    
    
};