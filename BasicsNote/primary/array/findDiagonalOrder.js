window.onload = function (ev) {
    
    /*
        给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。
 
        示例:
        输入:
        [
         [ 1, 2, 3 ],
         [ 4, 5, 6 ],
         [ 7, 8, 9 ]
        ]
        输出:  [1,2,4,7,5,3,6,8,9]
        
        说明:
        给定矩阵中的元素总数不会超过 100000 。
     */
    
    let matrix1 = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];
    
    function findDiagonalOrder(matrix) {
        let i = 0,
            j = 0,
            arr = [],
            fan = true;
        
        while (i < matrix.length && j < matrix[0].length) {
            arr.push(matrix[i][j]);
            if (fan) {
                if (j === matrix[0].length - 1) {
                    fan = !fan;
                    i++
                } else {
                    j++;
                    i === 0 ? fan = !fan : i--;
                }
                
            } else {
                if (i === matrix.length - 1) {
                    fan = !fan;
                    j++
                } else {
                    i++;
                    j === 0 ? fan = !fan : j--
                }
            }
        }
        
        return arr
    }
    
    console.log(findDiagonalOrder(matrix1))
    
};