window.onload = function (ev) {
    
    // 测试用例
    let arr1 =  [7, 1, 5, 3, 6, 4];
    let arr2 =  [1, 2, 3, 4, 5];
    let arr3 =  [7, 6, 4, 3, 1];
    
    //   1
    function maxProfit1(arr) {
        if(!arr || !arr.length) return 0;
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < arr[i + 1]) {
                for (let j = i; j < arr.length; j++) {
                    if (arr[j] > arr[j + 1] || j === arr.length - 1) {
                        num += arr[j] - arr[i];
                        i = j;
                        break;
                    }
                }
            }
        }
        return num;
    }
    
    function maxProfit2(arr, maxNum = 0){
        if (!arr || arr.length === 0) return 0;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] < arr[i + 1]) {
                maxNum += arr[i + 1] - arr[i];
            }
        }
        return maxNum;
    }
    
    function maxProfit3(arr) {
        if(!arr || !arr.length) return 0;
        let maxProfit = 0;
        for(let i = 0, len = arr.length; i < len; i++){
            let ben = arr[i + 1] - arr[i];
            if (ben > 0) maxProfit += ben;
        }
        return maxProfit;
    }
    
    function maxProfit(arr) {
        let i = 0,
            valley = arr[0],
            peak = arr[0],
            maxProfit = 0;
        while (i < arr.length - 1) {
            while (i < arr.length - 1 && arr[i] >= arr[i + 1]) i++;
            valley = arr[i];
            while (i < arr.length - 1 && arr[i] <= arr[i + 1]) i++;
            peak = arr[i];
            maxProfit += peak - valley;
        }
        return maxProfit;
    }
    
    console.log(maxProfit(arr1));
    console.log(maxProfit(arr2));
    console.log(maxProfit(arr3));
    
};