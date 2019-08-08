window.onload = function (ev) {
    
    
    /*
        编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
            每行的元素从左到右升序排列。
            每列的元素从上到下升序排列。
        
        示例:
        现有矩阵 matrix 如下：
        [
          [1,   4,  7, 11, 15],
          [2,   5,  8, 12, 19],
          [3,   6,  9, 16, 22],
          [10, 13, 14, 17, 24],
          [18, 21, 23, 26, 30]
        ]
        
        给定 target = 5，返回 true。
        给定 target = 20，返回 false。
     */
    
    
    function searchMatrix1(matrix, target) {
        let n = matrix.length - 1;
        if (n === -1) {
            return false
        }
        
        let m = matrix[0].length - 1;
        
        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= m; j++) {
                if (matrix[i][j] > target) {
                    m = j - 1
                } else if (matrix[i][j] === target) {
                    return true
                }
            }
        }
        
        return false
    }
    
    function searchMatrix(matrix, target) {
        if (matrix.length === 0) return false;
        let row = 0,
            col = matrix[0].length - 1;
        
        while (row < matrix.length && col <= 0) {
            let num = matrix[row][col];
            if (num === target) {
                return true
            } else if (num > target) {
                col--
            } else {
                row++
            }
        }
        
        return false
    }
    
    let matrix1 = [
        [ 1,  4,  7, 11, 15],
        [ 2,  5,  8, 12, 19],
        [ 3,  6,  9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ];
    
    console.log(matrix1);
    
    console.log(searchMatrix(matrix1, 5));
    console.log(searchMatrix(matrix1, 20));
    console.log(searchMatrix(matrix1, 26));
    console.log(searchMatrix(matrix1, 11))
    
};