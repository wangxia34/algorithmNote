window.onload = function (ev) {
    
    /*
        给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
        
        示例 1:
        输入:
        [
         [ 1, 2, 3 ],
         [ 4, 5, 6 ],
         [ 7, 8, 9 ]
        ]
        输出: [1,2,3,6,9,8,7,4,5]
        
        
        示例 2:
        输入:
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9,10,11,12]
        ]
        输出: [1,2,3,4,8,12,11,10,9,5,6,7]
     */
    
    let matrix1 = [
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ]
        ],
        matrix2 = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9,10,11,12]
        ],
        matrix3 = [
            [1],
            [2],
            [3],
            [4]
        ],
        matrix4 = [
            [1, 2, 3, 4, 5]
        ],
        matrix5 = [
            [1,11],
            [2,12],
            [3,13],
            [4,14],
            [5,15],
            [6,16],
            [7,17],
            [8,18],
            [9,19],
            [10,20]
        ];
    // console.log(matrix1);
    // console.log(spiralOrder(matrix1));
    // console.log(matrix2);
    // console.log(spiralOrder(matrix2));
    // console.log(matrix3);
    // console.log(spiralOrder(matrix3));
    // console.log(matrix4);
    // console.log(spiralOrder(matrix4));
    console.log(matrix5);
    console.log(spiralOrder(matrix5));
    
    function spiralOrder1(matrix) {
        const m = matrix.length;
    
        /** 边界状态 */
        if (m === 0) return [];
        if (m === 1) return matrix[0];
    
        const n = matrix[0].length;
    
        if (n === 1) { return matrix.reduce((acce, currV) => acce.concat(currV), []) }
    
        let topL = [0,0];
        let topR = [0,n];
        let bottomL = [m,0];
    
        let res = [];
        let tmpStartRow;
        let tmpEndRow;
        let tmpStartCol;
        let tmpEndCol;
    
        const closeIn = () => {
            topL[0] += 1;
            topL[1] += 1;
            topR[0] += 1;
            topR[1] -= 1;
            bottomL[0] -= 1;
            bottomL[1] += 1;
        };
    
        while (topL[0] < bottomL[0] && topL[1] < topR[1]) {
            tmpStartRow = [];
            tmpEndRow = [];
            tmpStartCol = [];
            tmpEndCol = [];
            for (let i = topL[0]; i < bottomL[0]; i++) {
                if (i === topL[0]) {
                    const isSingle = bottomL[0] - 1 === i;
                    for (let j = topL[1]; j < topR[1]; j++) {
                        tmpStartRow.push(matrix[i][j]);
                        !isSingle && tmpEndRow.unshift(matrix[bottomL[0] - 1][j]);
                    }
                    continue;
                }
                if (i === bottomL[0] - 1) {
                    break;
                }
                tmpStartCol.push(matrix[i][topR[1] - 1]);
                if (topR[1] - 1 !== topL[1]) {
                    tmpEndCol.unshift(matrix[i][topL[1]]);
                }
            }
            res = res.concat(tmpStartRow, tmpStartCol, tmpEndRow, tmpEndCol);
            closeIn();
        }
        return res;
    }
    /*
    先处理边界状态，比如0行或者1行或者1列的情况
    确保矩阵的行和列都有两行以上
    设定范围，范围用数组保存（第一个是所在的行，第二个是所在的列），限定左上角为[0,0]，右上角为[0,n]，左下角为[m,0]
    如果左上角的所在行比左小角所在行小，开始遍历matrix
    如果当前是在左上角所在的行，那么遍历左上角所在的行，直到左上角所在列等于右上角所在列，用一个临时数组存储遍历成功的数，同时用另外一个临时数组存储左小角所在行的数字（反向存储）
    左上角所在的行遍历完毕后，继续遍历matrix，直到index等于左下角所在行，分别用临时数组存储每一行数，index分别为左上角的列数和右上角的列数。
    最后把四个数组连接起来
    重复以上步骤直到不满足循环条件
    */
    
    
    function spiralOrder(matrix) {
        let n = matrix.length;
        
        if (n === 0) {return []}
        if (n === 1) {return matrix[0]}
        
        let m = matrix[0].length;
        
        if (m === 1) {return matrix.reduce((all, value) => all.concat(value), [])}
        
        let topL = [0, 0],
            topR = [0, m],
            bottomL = [n, 0],
            req = [];
        
        while (topL[0] < bottomL[0] && topR[1] > bottomL[1]) {
            let arr1 = [],
                arr2 = [],
                arr3 = [],
                arr4 = [];
            
            for (let i = topL[0]; i < bottomL[0]; i++) {
                if (i === topL[0]) {
                    let isArr3 = i === bottomL[0] - 1;
                    for (let j = topL[1]; j < topR[1]; j++) {
                        arr1.push(matrix[i][j]);
                        !isArr3 && arr3.unshift(matrix[bottomL[0] - 1][j])
                    }
                    continue;
                }
                if (i === bottomL[0] - 1) {
                    break;
                }
                arr2.push(matrix[i][topR[1] - 1]);
                if (topR[1] - 1 !== topL[1]) {
                    arr4.unshift(matrix[i][topL[1]]);
                }
            }
            
            req = req.concat(arr1, arr2, arr3, arr4);
            [topL[0], topL[1]] = [topL[0]+1, topL[1]+1];
            [topR[0], topR[1]] = [topR[0]+1, topR[1]-1];
            [bottomL[0], bottomL[1]] = [bottomL[0]-1, bottomL[1]+1];
        }
        
        return req;
    }
    
    
    
};