window.onload = function (ev) {
    
    
    /*
    给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
     */
    
    function generate(numRows) {
        let arr = [];
        if (numRows === 0) {return arr}
        arr = [[1]];
        if (numRows === 1) {return arr}
        
        for (let i = 2; i <= numRows; i++) {
            let arr1 = [1],
                arr2 = arr[i - 2];
            for (let j = 0; j < arr2.length - 1; j++) {
                arr1.push(arr2[j] + arr2[j+1])
            }
            arr1.push(1);
            arr.push(arr1)
        }
        
        return arr
    }
    
    console.log(generate(5));
    console.log(generate(7))
    
};