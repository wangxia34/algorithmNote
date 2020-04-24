window.onload = function (ev) {
    
    
    /*
        给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
    
        示例 1:
        输入:
        [
          [1,1,1],
          [1,0,1],
          [1,1,1]
        ]
        输出:
        [
          [1,0,1],
          [0,0,0],
          [1,0,1]
        ]
        
        
        示例 2:
        输入:
        [
          [0,1,2,0],
          [3,4,5,2],
          [1,3,1,5]
        ]
        输出:
        [
          [0,0,0,0],
          [0,4,5,0],
          [0,3,1,0]
        ]
        
        进阶:
        一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
        一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
        你能想出一个常数空间的解决方案吗？
     */
    
    /**
     * @param {number[][]} matrix
     * @return {void} Do not return anything, modify matrix in-place instead.
     */
    let setZeroes1 = function (matrix) {
        if (matrix.length < 0) return matrix;
        let x = [], y = [],
            yLen = matrix.length,
            xLen = matrix[0].length,
            i = 0, j = 0;
        
        while (i < yLen && j < xLen) {
            if (matrix[i][j] === 0) {
                if (!y.includes(i)) {
                    y.push(i);
                }
                if (!x.includes(j)) {
                    x.push(j);
                }
            }
            j++;
            if (j >= xLen) {j = 0;i++}
        }
        i = 0; j = 0;
        while (i < yLen && j < xLen) {
            if (y.includes(i) || x.includes(j)) {
                matrix[i][j] = 0
            }
            if (++j >= xLen) {j = 0;i++}
        }
    };
    
    /**
     * @param {number[][]} matrix
     * @return {void} Do not return anything, modify matrix in-place instead.
     */
    let setZeroes2 = function (matrix) {
        let m = matrix.length;
        let n = matrix[0].length;
        let indexArr = [];
        for(let i=0;i<m;i++){
            for(let j=0;j<n;j++){
                if(matrix[i][j] === 0) indexArr.push([i, j]);
            }
        }
        for(let k=0;k<indexArr.length;k++){
            let temp = indexArr[k];
            let x = temp[0];
            let y = temp[1];
            // row
            for(let r=0;r<n;r++){
                matrix[x][r] = 0;
            }
            // column
            for(let c=0;c<m;c++){
                matrix[c][y] = 0;
            }
        }
    };
    
    let setZeroes = function (matrix) {
        let m = matrix.length;
        let n = matrix[0].length;
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < n; j++) {
                if(matrix[i][j] === 0) {
                    for(let k = 0; k < m; k++) {
                        if(matrix[k][j] !== 0) matrix[k][j] = null
                    }
                    for(let l = 0; l < n; l++) {
                        if(matrix[i][l] !== 0) matrix[i][l] = null
                    }
                }
            }
        }
    
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < n; j++) {
                if(matrix[i][j] === null) matrix[i][j] = 0
            }
        }
    
        return matrix
    };
    
    
    let matrix1 = [
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ];
    let matrix2 = [
        [0,1,2,0],
        [3,4,5,2],
        [1,3,1,5]
    ];
    let matrix3 = [
        [3,7,2,8,2],
        [2,2,4,1,8],
        [0,5,7,6,3],
        [8,1,0,7,7],
        [1,3,7,4,1],
        [6,5,5,6,3],
        [7,1,0,1,9],
        [5,4,4,9,7],
        [2,2,4,1,0],
        [7,1,1,9,1],
        [8,0,4,7,6],
        [7,5,1,2,3],
        [7,2,5,9,3]
    ];
    
   
    console.log(matrix1, setZeroes(matrix1));
    console.log(matrix2, setZeroes(matrix2));
    console.log(matrix3, setZeroes(matrix3));
    
    
};