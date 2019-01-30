window.onload = function (ev) {
    
    // 测试用例
    let arr1 = [0, 1, 0, 3, 12];
    
    
    function moveZeroes1(arr) {
        let index = 0,
            zero = [];
        do {
            if (arr[index] === 0) {
                zero.push(arr.splice(index, 1)[0]);
            } else {
                index++;
            }
        } while (index <= arr.length);
        
        arr.splice(arr.length, 0, ...zero);
        
        return arr;
    }
    
    function moveZeroes2(arr) {
        let l = arr.length;
        let count = 0;
        for (let h = 0; h < l; h = h + 1) {
            if (arr[h] === 0) {
                arr.splice(h, 1);
                count = count + 1;
                h = h - 1;
            }
        }
        for(let m = 1; m <= count; m = m + 1){
            arr.push(0)
        }
        return arr;
    }
    
    function moveZeroes(arr) {
        let i = 0,
            j = 0,
            size = arr.length;
        for(i = 0 ; i < size; i++) {
            if(arr[i] !== 0) {
                arr[j++] = arr[i];
            }
        }
        while(j < size) {
            arr[j++] = 0;
        }
        return arr;
    }
    
    console.log(moveZeroes(arr1), arr1)
    
    
};