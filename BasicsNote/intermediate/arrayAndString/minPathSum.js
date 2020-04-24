window.onload = function (ev) {
    
    
    /*
        给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
        
        说明：每次只能向下或者向右移动一步。
        
        示例:
        输入:
        [
          [1,3,1],
          [1,5,1],
          [4,2,1]
        ]
        输出: 7
        解释: 因为路径 1→3→1→1→1 的总和最小。
     */
    
    
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    let minPathSum1 = function(grid) {
    
        let m = grid.length,
            n = grid[0].length;
        
        let arr = new Array(m).fill(0);
        arr.forEach((value, index) => {arr[index] = []});
        arr[0][0] = grid[0][0];
        
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (i === 0 && j === 0) {
                
                } else if (i === 0) {
                    arr[i][j] = arr[i][j - 1] + grid[i][j]
                } else if (j === 0) {
                    arr[i][j] = arr[i - 1][j] + grid[i][j]
                } else {
                    arr[i][j] = Math.min(arr[i - 1][j], arr[i][j - 1]) + grid[i][j]
                }
            }
        }
        
        return arr[m-1][n-1]
    };
    
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    let minPathSum = function(grid) {
        let res = [],
            vLen = grid.length,
            hLen = grid[0].length;
        for (let i = 0; i < vLen; i++) {
            const d = res[i - 1] && res[i - 1][0] + grid[i][0] || grid[i][0];
            res.push([d]);
        }
        for (let i = 1; i < hLen; i++) {
            res[0][i] = res[0][i - 1] + grid[0][i];
        }
        for (let i = 1; i < vLen; i++) {
            for (let j = 1; j < hLen; j++) {
                res[i][j] = Math.min(res[i - 1][j], res[i][j - 1]) + grid[i][j];
            }
        }
        return res[vLen - 1][hLen - 1];
    };
    
    
    
    
    let grid1 = [
        [1,3,1],
        [1,5,1],
        [4,2,1]
    ];
    console.log(grid1, minPathSum(grid1))
};