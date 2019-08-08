window.onload = function (ev) {
    
    /*
        给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。


        在杨辉三角中，每个数是它左上方和右上方的数的和。
        
        示例:
        输入: 3
        输出: [1,3,3,1]
        
        
        进阶：
        你可以优化你的算法到 O(k) 空间复杂度吗？
     */
    
    
    function getRow1(rowIndex) {
        let arr = [[1]];
        
        for (let i = 2; i <= rowIndex + 1; i++) {
            let arr1 = [1],
                arr2 = arr[i - 2];
            for (let j = 0; j < arr2.length - 1; j++) {
                arr1.push(arr2[j] + arr2[j+1])
            }
            arr1.push(1);
            arr.push(arr1)
        }
        return arr[rowIndex]
    }
    
    
    function getRow2(rowIndex) {
        let arrEnd = [1],
            arr1 = [1];
        
        for (let i = 0; i < rowIndex; i++) {
            for (let j = 0; j < arrEnd.length - 1; j++) {
                arr1.push(arrEnd[j] + arrEnd[j + 1])
            }
            arr1.push(1);
            arrEnd = arr1;
            arr1 = [1]
        }
        
        return arrEnd
    }
    
    function getRow(rowIndex) {
        if (rowIndex === 0) {
            return [1]
        } else if (rowIndex === 1) {
            return [1, 1]
        } else {
            let index = 1;
            let result = [1];
            for (let i = 0; i < rowIndex; i++) {
                index = index * (rowIndex - i) / (i + 1);
                result.push(index)
            }
            return result
        }
    }
    
    // 2   1 1*2/1 2*1/2
    // 3   1 1*3/1 3*2/2 3*1/3
    // 4   1 1*4/1 4*3/2 6*2/3 4*1/4
    
    /*
    [
  0       [1],
  1      [1,1],
  2     [1,2,1],
  3    [1,3,3,1],
  4   [1,4,6,4,1]
    ]
     */
    
    console.log(getRow(3));
    console.log(getRow(5));
};