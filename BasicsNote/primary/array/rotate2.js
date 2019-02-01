window.onload = function (ev) {
    
    // 测试用例
    let arr1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    
    let arr2 = [
        [ 5, 1, 9,11],
        [ 2, 4, 8,10],
        [13, 3, 6, 7],
        [15,14,12,16]
    ];
    
    
    
    function rotate1(matrix) {
        for (let i = 0; i < Math.floor(matrix.length / 2); i++) {
            [matrix[i], matrix[matrix.length - 1 - i]] = [matrix[matrix.length - 1 - i], matrix[i]];
        }
        
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = i + 1; j < matrix[i].length; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
    }
    
    function rotate(matrix) {
        let length = matrix.length - 1;
        for (let y = 0; y < length / 2; y++) {
            for (let x = y; x < length - y; x++) {
                let temp = matrix[y][x];
                matrix[y][x] = matrix[length - x][y];
                matrix[length - x][y] = matrix[length - y][length - x];
                matrix[length - y][length - x] = matrix[x][length - y];
                matrix[x][length - y] = temp;
            }
        }
    }
    
    
    function rotate2(matrix) {
        let row = matrix.length,
            col = matrix[0].length;
        // 先x轴对称旋转
        for (let i = 0; i < row; i++) {
            let array = matrix[i];
            let left = 0, right = array.length-1;
            while (left < right) {
                swap(i, left, i, right);
                left++;
                right--;
            }
        }
        // 再进行对称交换
        for (let i = 0; i < row; i++) {
            let len = col-i;
            for (let j = 0; j < len; j++) {
                swap(i, j, row-j-1, col-i-1)
            }
        }
        function swap(i, j, i1, j1){
            let temp = matrix[i][j];
            matrix[i][j] = matrix[i1][j1];
            matrix[i1][j1] = temp
        }
    }
    
    
    rotate(arr1);
    console.log(arr1);
    
    rotate(arr2);
    console.log(arr2);
    
    
};